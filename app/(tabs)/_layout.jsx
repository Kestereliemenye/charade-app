import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";

// _layout.tsx
export default function Layout() {
  return (
    // Instead of passing the component directly, use a functional wrapper
    <Tabs
      tabBar={(props) => <CustomTabs {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="decks" />
      <Tabs.Screen name="settings"  />
    </Tabs>
  );
}