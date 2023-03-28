import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { IconButton } from "react-native-paper";
import { HomeScreens } from "./screens";
import { IThread } from "./screens/AllChats";
export type HomeStackParamList = {
  AllChats: undefined;
  RoomScreen: { thread: IThread };
};
const Home = createNativeStackNavigator<HomeStackParamList>();
const HomeNavigator = () => {
  return (
    <Home.Navigator
      initialRouteName="AllChats"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#128c7e",
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 25,
        },
      }}
    >
      <Home.Screen
        name="AllChats"
        options={{ headerTitle: "Schmoozeee" }}
        component={HomeScreens.AllChatsScreen}
      />
      <Home.Screen
        name="RoomScreen"
        options={({ route }) => ({
          title: route.params.thread.name,
        })}
        component={HomeScreens.RoomScreen}
      />
    </Home.Navigator>
  );
};

export default HomeNavigator;
