import "react-native-gesture-handler";
import "expo-dev-client";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthProvider";
export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Navigation colorScheme={"light"} />
        </SafeAreaProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
