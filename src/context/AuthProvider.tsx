import React, { createContext, ReactNode, useState } from "react";
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { showToastWithGravity } from "../components/Toast";
type ErrorWithCode = Error & { code?: string };
type IUser = FirebaseAuthTypes.User;
type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  logout: () => void;
  error: ErrorWithCode | null;
  signIn: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signIn: () => {},
  logout: async () => {},
  error: null,
  loading: false,
  setLoading: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorWithCode | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        loading,
        setLoading,
        signIn: async () => {
          try {
            setLoading(true);
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();

            setError(null);
            const googleCredential = auth.GoogleAuthProvider.credential(
              userInfo.idToken
            );
            auth()
              .signInWithCredential(googleCredential)
              .then(() => setLoading(false));
          } catch (error) {
            setLoading(false)
            const typedError = error as NativeModuleError;

            switch (typedError.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                // sign in was cancelled
                showToastWithGravity("Cancelled");
                break;
              case statusCodes.IN_PROGRESS:
                // operation (eg. sign in) already in progress
                showToastWithGravity("In progress");
                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                // android only
                showToastWithGravity("Play services not available or outdated");
                break;
              default:
                showToastWithGravity(
                  "Something went wrong" + "\n" + typedError.toString()
                );
                setError(typedError);
            }
          }
        },
        logout: async () => {
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth().signOut();
            setUser(null);
          } catch (error) {
            const typedError = error as NativeModuleError;
            console.log(typedError);
            setError(typedError);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
