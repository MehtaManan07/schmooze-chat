import { View } from "react-native";
import React, { useContext } from "react";
import WelcomeView from "./WelcomeView";
import { AuthContext } from "../../../../context/AuthProvider";

const Welcome = () => {
  const { signIn, loading } = useContext(AuthContext);

  return (
    <View>
      <>
        <WelcomeView loading={loading} submitHandler={signIn} />
      </>
    </View>
  );
};

export default Welcome;
