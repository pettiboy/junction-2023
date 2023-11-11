import { Stack } from "expo-router";

import { Text, View } from "react-native";
import {
  SplashScreen,
  // This example uses a basic Layout component, but you can use any Layout.
  Slot,
} from "expo-router";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_bottom",
        headerBackButtonMenuEnabled: true,
      }}
    />
  );
}
