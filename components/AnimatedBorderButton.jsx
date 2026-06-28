import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { spacingX, spacingY } from "../constants/theme";

const AnimatedBorderButton = ({ children, onPress, style }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.borderContainer, style]}
    >
      <Animated.View style={[styles.rotatingBorder, animatedStyle]}>
        <LinearGradient
          colors={["#FFD700", "#B8860B", "#FFD700"]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View style={styles.contentContainer}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 3,
  },
  rotatingBorder: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    backgroundColor: "#0A2508",
    borderRadius: 50,
    // paddingVertical: 15,
    paddingVertical: spacingY._15,
    // paddingHorizontal: 40,
    paddingHorizontal: spacingX._40,
    // alignItems: "center", // Ensures content stays centered
  },
});

export default AnimatedBorderButton;
