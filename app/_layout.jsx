import React from "react";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { AudioProvider } from "../contexts/AudioContext"; // Ensure this path is correct

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Your main tabs are handled by a separate _layout.tsx in your (main) folder */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

const RootLayout = () => {
  // Load the fonts
  let [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_700Bold,
  });

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null;
  }

  return (
    <AudioProvider>
      <StackLayout />
    </AudioProvider>
  );
};

export default RootLayout;
