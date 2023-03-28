import type { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "../modules/auth/auth.navigator";
import { HomeStackParamList } from "../modules/home/home.navigator";

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: NavigatorScreenParams<HomeStackParamList>;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
