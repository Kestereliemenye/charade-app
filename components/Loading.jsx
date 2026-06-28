import { colors } from "../constants/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

const Loading = ({ size = "large", color = colors.primaryDark }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
