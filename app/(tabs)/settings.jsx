import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import Typo from "../../components/Typo"; // Assuming you have your custom Typo
// import { AudioContext } from "../../contexts/AudioContext";
import { colors, spacingX, spacingY } from "../../constants/theme";
import ScreenWrapper from "../../components/ScreenWrapper";
import AudioSettings from "../../components/AudioSettings";
import { verticalScale } from "../../utils/styling";
import GameMode from "../../components/GameMode";
import Language from "../../components/Language";
import Credits from "../../components/Credits";
import MuteBtn from "../../components/MuteBtn";

const Settings = () => {
  return (
    <ScreenWrapper showPattern={true}bgOpacity={0.4}>
      <Typo size={35} style={styles.header} fontWeight={"700"}>
        SETTINGS
      </Typo>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AudioSettings />
        <GameMode />
        <Language />
        <Credits />
        <MuteBtn/>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Settings;
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
    flex: 1,
  },
  header: {
    color: colors.white,
    textAlign: "center",
    marginTop: verticalScale(20),
    fontFamily: "Poppins_900Black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 0.5,
  },
});

