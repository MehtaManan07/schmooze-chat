import React, { useEffect } from "react";
import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as Font from "expo-font";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SVGImage from "../../components/SVG";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Splash() {
  const { navigate } = useNavigation();
  const focused = useIsFocused();
  async function userCheck() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    try {
      await Font.loadAsync(Entypo.font);
    } catch (e) {
      console.warn(e);
    } finally {
      if (isSignedIn) {
        navigate("Home", { screen: "AllChats" });
      } else {
        setTimeout(() => {
          navigate("Auth", { screen: "Welcome" });
        }, 1500);
      }
    }
  }
  useEffect(() => {
    if (focused) {
      userCheck();
    }
  }, [focused]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#99dfff",
      }}
    >
      <SVGImage type="Logo" size={300} />
    </View>
  );
}
