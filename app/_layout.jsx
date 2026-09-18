import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { AudioProvider } from "../contexts/AudioContext";

// Keep the native splash screen visible while assets load
SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="Lobby" />

      <Stack.Screen
        name="Tutorial"
        options={{
          gestureEnabled: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="GamePlay"
        options={{
          animation: "none",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ScoreScreen"
        options={{ animation: "none", gestureEnabled: false }}
      />
      <Stack.Screen name="SplashScreen" />
    </Stack>
  );
};

const RootLayout = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Load fonts
  let [fontsLoaded] = useFonts({
    Poppins_900Black,
    Poppins_700Bold,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // Load images and hide splash screen
  useEffect(() => {
    async function prepare() {
      try {
        const images = [
          require("../assets/images/splash-img.png"),
          require("../assets/images/splashbgscreen.png"),
          require("../assets/images/screenWrapper-img.png"),
          // Add your background images here
          require("../assets/images/nollywoodBg.png"),
          require("../assets/images/nollywoodLobbyImg.png"),
        ];

        const cacheImages = images.map((image) =>
          Asset.fromModule(image).downloadAsync(),
        );

        await Promise.all(cacheImages);
        setAssetsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  // Wait for both fonts and images to be ready
  useEffect(() => {
    if (fontsLoaded && assetsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, assetsLoaded]);

  if (!fontsLoaded || !assetsLoaded) {
    return null;
  }

  return (
    <AudioProvider>
      <StackLayout />
    </AudioProvider>
  );
};

export default RootLayout;
