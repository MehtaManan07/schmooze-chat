import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  MessageProps,
  Time,
  TimeProps,
} from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import { View, Text, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { styles } from "./styles";
import ReplyMessageBar from "../../../../components/chat/ReplyMessageBar";
import ChatMessageBox from "../../../../components/chat/ChatMessageBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { AuthContext } from "../../../../context/AuthProvider";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { IThread } from "../AllChats";
import {
  loadChatDataFromLocal,
  saveChatData,
} from "../../../../utils/cacheData";
import { showToastWithGravity } from "../../../../components/Toast";
import CustomActions from "./CustomActions";
type MyMessage = IMessage & {
  replyMessage?: IMessage;
};
const RoomScreen = () => {
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const focused = useIsFocused();
  const { thread } = route.params as { thread: IThread };

  const [replyMessage, setReplyMessage] = useState<MyMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  const [messages, setMessages] = useState<MyMessage[]>([]);

  const clearReplyMessage = () => setReplyMessage(null);
  const onSend = useCallback(
    async (messages: MyMessage[] = []) => {
      if (replyMessage) {
        const messageWithoutUndefinedText = {
          ...replyMessage,
          text: replyMessage.text !== undefined ? replyMessage.text : null,
        };
        messages[0].replyMessage = messageWithoutUndefinedText as MyMessage;
      }
      firestore()
        .collection("THREADS")
        .doc(thread._id)
        .collection("MESSAGES")
        .add(messages[0])
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setReplyMessage(null);
        });
      await firestore()
        .collection("THREADS")
        .doc(thread._id)
        .set(
          {
            latestMessage: { ...messages[0], localTime: new Date() },
          },
          { merge: true }
        )
        .catch((err) => console.log("err", err));
    },
    [replyMessage]
  );
  const renderCustomInputToolbar = (props: InputToolbarProps<MyMessage>) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputContainer}
      accessoryStyle={styles.replyBarContainer}
    />
  );
  const renderCustomActions = (props: any) => (
    <CustomActions onSend={onSend} {...props} />
  );
  const renderAccessory = () =>
    replyMessage && (
      <ReplyMessageBar message={replyMessage} clearReply={clearReplyMessage} />
    );

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  const renderMessageBox = (props: MessageProps<MyMessage>) => (
    <ChatMessageBox
      {...props}
      setReplyOnSwipeOpen={setReplyMessage}
      updateRowRef={updateRowRef}
    />
  );

  const renderReplyMessageView = (props: BubbleProps<MyMessage>) => {
    return (
      <>
        {props.currentMessage && props.currentMessage.replyMessage && (
          <>
            <View style={styles.replyMessageContainer}>
              {props.currentMessage.replyMessage.image ? (
                <Image
                  source={{ uri: props.currentMessage.replyMessage.image }}
                  style={styles.replyImageStyles}
                />
              ) : (
                <Text>{props.currentMessage.replyMessage.text}</Text>
              )}
              <View style={styles.replyMessageDivider} />
            </View>
          </>
        )}
      </>
    );
  };
  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} iconColor="#6646ee" />
      </View>
    );
  };
  const renderTime = (props: TimeProps<MyMessage>) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: "black",
          },
          right: {
            color: "black",
          },
        }}
      />
    );
  };
  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

  useEffect(() => {
    const messageListener = firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnap) => {
          const messages = querySnap.docs.map((doc) => {
            const firebaseData = doc.data();
            const createdAt = new Date(
              firebaseData.createdAt.seconds * 1000 +
                firebaseData.createdAt.nanoseconds / 1000000
            );
            return {
              _id: firebaseData._id,
              text: firebaseData.text,
              ...(firebaseData.image && { image: firebaseData.image }),
              createdAt,
              user: {
                _id: firebaseData.user._id,
                name: (firebaseData.user.name as string).split(" ")[0],
              },
              ...(firebaseData.replyMessage && {
                replyMessage: firebaseData.replyMessage,
              }),
            };
          });
          setMessages(messages);
        },
        async (error) => {
          console.log(error);
          const data = await loadChatDataFromLocal();
          if (data) {
            if (data.threads) {
              const cachedMessages = data.threads.map((t: any) => {
                if (t._id === thread._id) {
                  return messages;
                }
              });
              setMessages(cachedMessages);
            }

            // setThreads(data.threads);
            showToastWithGravity(
              `Unable to connect to server. Showing cached messages.`
            );
          }
        }
      );

    return () => messageListener();
  }, []);
  useEffect(() => {
    if (focused) {
      loadChatDataFromLocal().then((data) => {
        if (data.threads) {
          const updatedData = data.threads.map((t: any) => {
            if (t._id === thread._id) {
              return { ...t, messages };
            }
          });
          saveChatData(updatedData)
        }
      });
    }
  }, [focused, messages]);
  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.uid as string,
          name: user?.displayName as string,
        }}
        isKeyboardInternallyHandled={false}
        renderInputToolbar={renderCustomInputToolbar}
        renderAccessory={renderAccessory}
        onLongPress={(_, message) => setReplyMessage(message)}
        messagesContainerStyle={styles.messageContainer}
        renderMessage={renderMessageBox}
        renderCustomView={renderReplyMessageView}
        placeholder="Type your message here..."
        alwaysShowSend
        renderActions={renderCustomActions}
        scrollToBottomComponent={scrollToBottomComponent}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "black",
                  fontFamily: "CerebriSans-Book",
                },
                left: {
                  color: "#24204F",
                  fontFamily: "CerebriSans-Book",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#E6F5F3",
                },
                right: {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          );
        }}
        renderTime={renderTime}
      />
    </SafeAreaView>
  );
};
export default RoomScreen;
