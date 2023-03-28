import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECE5DD" },
  inputContainer: {
    flexDirection: "column-reverse",
    paddingBottom: 1,
    paddingTop: 5,
  },
  replyBarContainer: { height: "auto" },
  messageContainer: { flex: 1, paddingBottom: 50 },
  replyMessageContainer: {
    padding: 8,
    paddingBottom: 0,
    opacity: 0.4,
    backgroundColor: "#d5d5d5",
  },
  replyMessageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    paddingTop: 6,
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  replyImageStyles: { height: 40, width: 40 },
});
