import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";

export default function BackBtn({ style, iconSize = 26 ,onPress}) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress(); // Run custom function if passed
        }
        router.back(); // Always go back
      }}
      style={[styles.button, style]}
    >
      <CaretLeft
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
