import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
type ButtonProps = {
  text: String;
  onPress: (e?: any) => void;
  icon?: string;
  color?: string;
  mode?: "text" | "outlined" | "contained";
  style?: {};
  disabled?: boolean;
  loading?: boolean;
};
const AppButton = (props: ButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      contentStyle={styles.contentStyles}
      icon={props.icon}
      onPress={props.onPress}
      loading={props.loading}
      mode={props.mode}
      style={{ ...props.style, ...styles.button }}
      labelStyle={styles.labelStyles}
    >
      {props.text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 54,
    justifyContent: "center",
    elevation: 0,
    backgroundColor: '#128c7e'
  },
  contentStyles: {
    height: "100%",
  },
  labelStyles: {
    textTransform: "none",
    fontSize: 16,
  },
});
export default AppButton;
