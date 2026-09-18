import { StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "../components/Typo";
import { useRouter } from "expo-router";
import { useEffect } from "react";


const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Tutorial");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <ScreenWrapper
      showPattern
      showOverlay
      overlayColor={colors.spalshBg_light}
      overlayOpacity={0.9}
    >
      <View style={styles.container}>
        <Typo
          size={60}
          color={colors.white}
          fontWeight={800}
          style={{ textAlign: "center", fontFamily: "Montserrat_600Bold" }}
        >
          Naija
        </Typo>
        <Typo
          size={60}
          color={colors.white}
          fontWeight={800}
          style={{
            textAlign: "center",
            color: colors.primary_yellow,
            fontFamily: "Montserrat_600Bold",
          }}
        >
          Charades
        </Typo>
      </View>
    </ScreenWrapper>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
