import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import React, { useEffect } from "react";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { spacingX, spacingY } from "../../constants/theme";
import Animated, {
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

import AnimatedBorderButton from "../../components/AnimatedBorderButton";
import { verticalScale } from "../../utils/styling";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Welcome = () => {
    //FOR IMAGE BOUNCINGG ANIMATION
  // 1. Create a shared value for the vertical offset
  const translateY = useSharedValue(0);

  // 2. Trigger the bounce loop when the component mounts
  useEffect(() => {
    translateY.value = withRepeat(
      withSpring(-20, { damping: 50, stiffness: 200 }), // Bounce up 20px
      -1, // Infinite repetitions
      true, // Reverse direction (creates the bounce effect)
    );
  }, []);

  // 3. Create the animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));


    
  const router = useRouter();
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Typo
            color={colors.white}
            size={43}
            fontWeight={"900"}
            style={[
              styles.welcomeText,
              {
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 0.5,
              },
            ]}
          >
            Naija
          </Typo>
          <Typo
            color={colors.white}
            size={43}
            fontWeight={"900"}
            style={[
              styles.welcomeText,
              {
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 0.5,
              },
            ]}
          >
            Charades
          </Typo>
        </View>
        <Animated.Image
          entering={SlideInDown.duration(1000).springify().damping(12)}
          source={require("../../assets/images/naija_charades_centerpiece_icon.png")}
          style={[styles.welcomeImage, animatedStyle]}
          resizeMode={"center"}
        />
        <View>
          <Typo
            color={colors.white}
            size={43}
            fontWeight={"900"}
            style={[
              styles.welcomeText,
              {
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 0.5,
              },
            ]}
          >
            Pure Naija
          </Typo>
          <Typo
            color={colors.white}
            size={43}
            fontWeight={"900"}
            style={[
              styles.welcomeText,
              {
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: 5, height: 5 },
                textShadowRadius: 0.5,
              },
            ]}
          >
            Energy
          </Typo>
        </View>
        <AnimatedBorderButton>
          <Typo
            size={23}
            fontWeight={"850"}
            color={colors.white}
            style={{ textAlign: "center", fontFamily: "Poppins_900Black" }}
          >
            Play Now
          </Typo>
        </AnimatedBorderButton>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: verticalScale(250),
    aspectRatio: 1,
    alignSelf: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontFamily: "Poppins_900Black",
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#C5A059",
    alignItems: "center",
    justifyContent: "center",
  },
});
