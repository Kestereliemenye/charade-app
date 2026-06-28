import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
// Import the fonts
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="(main)/newConversationModal"
        options={{ presentation: "modal" }}
      />
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

  return <StackLayout />;
};

export default RootLayout;
