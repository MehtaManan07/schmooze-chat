import { Image, View, Animated } from "react-native";
import React from "react";
import { IMessage, Message, MessageProps } from "react-native-gifted-chat";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { isSameDay, isSameUser } from "react-native-gifted-chat/lib/utils";
import { styles } from "./styles";

type IChatMessageBoxProps = {
  setReplyOnSwipeOpen: (message: IMessage) => void;
  updateRowRef: (ref: any) => void;
} & MessageProps<IMessage>;

const ChatMessageBox = ({
  setReplyOnSwipeOpen,
  updateRowRef,
  ...props
}: IChatMessageBoxProps) => {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameUser(props.currentMessage, props.nextMessage) &&
    isSameDay(props.currentMessage, props.nextMessage);

  const renderRightAction = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number | string>
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: size }, { translateX: trans }] },
          { borderWidth: 1 },
          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === "right" && styles.leftOffsetValue,
        ]}
      >
        <View style={styles.replyImageWrapper}>
          <Image
            style={styles.replyImage}
            source={require("../../../../assets/reply.png")}
          />
        </View>
      </Animated.View>
    );
  };
  const onSwipeOpenAction = () => {
    if (props.currentMessage) {
      setReplyOnSwipeOpen({ ...props.currentMessage });
    }
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightAction}
        onSwipeableOpen={onSwipeOpenAction}
      >
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ChatMessageBox;

