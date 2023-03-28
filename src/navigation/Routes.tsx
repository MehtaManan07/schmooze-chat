import React, { useContext, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "../modules/Auth/auth.navigator";
import { RootStackParamList } from "./types";
import auth from "@react-native-firebase/auth";
import SplashScreen from "../modules/Splash";
import HomeNavigator from "../modules/Home/home.navigator";
import { AuthContext } from "../context/AuthProvider";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const Routes = () => {
  
  const _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "334693296627-q1ftrvb7korbb2iqi2uvtcfuv3thj538.apps.googleusercontent.com",
      offlineAccess: false,
      profileImageSize: 150,
    });
  };
  const { user, setUser } = useContext(AuthContext);

  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    _configureGoogleSignIn()
    return subscriber; // unsubscribe on unmount
  }, []);
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      {user ? (
        <RootStack.Screen name="Home" component={HomeNavigator} />
      ) : (
        <>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </RootStack.Navigator>
  );
};
export default Routes;
