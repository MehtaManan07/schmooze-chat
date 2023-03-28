import { ToastAndroid } from "react-native";

export const showToastWithGravity = (text: string) => {
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
