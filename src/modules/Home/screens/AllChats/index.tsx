import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import fireStore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { IMessage } from "react-native-gifted-chat";
import {
  loadChatDataFromLocal,
  saveChatData,
} from "../../../../utils/cacheData";
import { showToastWithGravity } from "../../../../components/Toast";
import AllChatView from "./AllChatView";
interface IFirebaseMessage extends IMessage {
  localTime: FirebaseFirestoreTypes.Timestamp;
}
export type IThread = {
  _id: string;
  name: string;
  latestMessage?: IFirebaseMessage;
};
export default function HomeScreen() {
  const focused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [roomName, setRoomName] = useState<string>("");
  const [threads, setThreads] = useState<IThread[]>([]);
  const [loading, setLoading] = useState(true);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const { navigate, setOptions } = useNavigation();
  const onSubmit = () => {
    if (roomName?.length > 0) {
      fireStore()
        .collection("THREADS")
        .add({ name: roomName })
        .then((data) => {
          data.get().then((doc) => {
            let thread = doc.data();
            let id = doc.id;
            navigate("Home", {
              screen: "RoomScreen",
              params: { thread: { _id: id, name: thread?.name } },
            });
            hideModal();
          });
        });
    }
  };
  useEffect(() => {
    const unsubscribe = fireStore()
      .collection("THREADS")
      .onSnapshot(
        (querySnapshot) => {
          const firebaseThreads = querySnapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: "",
              ...documentSnapshot.data(),
            };
          });

          setThreads(firebaseThreads);

          if (loading) {
            setLoading(false);
          }
        },
        async (error) => {
          console.log(error);
          const data = await loadChatDataFromLocal();
          if (data) {
            setThreads(data.threads);
            showToastWithGravity(
              `Unable to connect to server. Showing cached messages.`
            );
          }
        }
      );

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);
  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <IconButton icon={"logout"} onPress={() => setVisibleLogout(true)} />
      ),
    });
  }, []);
  useEffect(() => {
    if (focused) {
      saveChatData({ threads })
    }
  }, [focused, threads]);
  return (
    <SafeAreaView style={styles.container}>
      <AllChatView
        onSubmit={onSubmit}
        roomName={roomName}
        setRoomName={setRoomName}
        setVisible={setVisible}
        setVisibleLogout={setVisibleLogout}
        showModal={showModal}
        threads={threads}
        visible={visible}
        visibleLogout={visibleLogout}
      />
    </SafeAreaView>
  );
}
