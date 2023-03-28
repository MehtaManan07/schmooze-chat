import { ToastAndroid } from "react-native";

export const showToastWithGravity = (
  text: string,
  position?: "top" | "bottom" | "center"
) => {
  let pos = ToastAndroid.TOP;
  if (position === "bottom") {
    pos = ToastAndroid.BOTTOM;
  } else if (position === "center") {
    pos = ToastAndroid.CENTER;
  }
  ToastAndroid.showWithGravity(text, ToastAndroid.SHORT,  pos);
};
