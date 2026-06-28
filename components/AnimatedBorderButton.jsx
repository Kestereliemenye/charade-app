import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedBorderButton = ({ children, style }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1, // Infinite
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.borderContainer, style]}>
      <Animated.View style={[styles.rotatingBorder, animatedStyle]}>
        <LinearGradient
          colors={["#FFD700", "#B8860B", "#FFD700"]} // Gold gradient
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderRadius: 30,
    overflow: "hidden",
    padding: 3, // This defines the thickness of the gold border
  },
  rotatingBorder: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    backgroundColor: "#0A2508", // Matches your inner button color
    borderRadius: 27,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
});

export default AnimatedBorderButton;
