import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AuthScreens } from "./screens";
export type AuthStackParamList = {
  Welcome: undefined;
};
const Auth = createNativeStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTitleStyle: {
          fontSize: 17,
        },
        headerTitleAlign: "center",
      }}
    >
      <Auth.Screen
        name="Welcome"
        component={AuthScreens.WelcomeScreen}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
