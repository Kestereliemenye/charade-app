import { StatusBar, StyleSheet, View } from "react-native";
import Animated, {
  FadeInDown,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();
  
  const scale = useSharedValue(1);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  useEffect(() => {
    scale.set(
      withDelay(
        700,
        withTiming(2.5, {
          duration: 700,
          easing: Easing.out(Easing.ease),
        }),
      ),
    );

    const redirectTimer = setTimeout(() => {
      router.replace("/SplashScreen");
    }, 1500);

    return () => clearTimeout(redirectTimer);
  }, [router, scale]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />

      <Animated.View entering={FadeInDown.duration(700).springify()}>
        <Animated.Image
          source={require("../assets/images/splash-img.png")}
          style={[styles.logo, animatedImageStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.spalshBg,
  },

  logo: {
    height: 180,
    width: 180,
  },
});
