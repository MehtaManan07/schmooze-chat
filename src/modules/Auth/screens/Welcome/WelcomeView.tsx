import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { styles } from "./styles";
import SVGImage from "../../../../components/SVG";
import AppButton from "../../../../components/buttons/AppButton";
type IProps = {
  submitHandler: () => void;
  loading: boolean;
};
const WelcomeView = (props: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>SCHMOOZEEE</Text>
        <SVGImage type={"Welcome"} size={375} />
        <Text numberOfLines={2} style={styles.subheading}>
          Swipe Memes, {`\n`} Not People{" "}
        </Text>
      </View>
      <View>
        <AppButton
          icon={"google"}
          mode="contained"
          text="Sign in with Google"
          onPress={props.submitHandler}
          loading={props.loading}
          disabled={props.loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeView;
