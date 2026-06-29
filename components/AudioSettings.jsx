import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Typo from "./Typo"; // Assuming you have your custom Typo
import { AudioContext } from "../contexts/AudioContext";
import { colors, radius } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import * as Icons from "phosphor-react-native";


const AudioSettings = () => {
     const { musicVolume, setMusicVolume, effectVolume, setEffectVolume } =
        useContext(AudioContext);
    
  return (
    <View style={styles.container}>
          <View style={{flexDirection:"row", alignItems:"center",  justifyContent:"center", gap: verticalScale(5), marginBottom:verticalScale(15)}}>
              <Icons.SpeakerSimpleHighIcon weight="fill" color={colors.green
              } />
        <Typo
          size={25}
          fontWeight="700"
          style={styles.title}
          color={colors.white}
        >
          Sound Settings
        </Typo>
      </View>
      <Typo
        size={19}
        color={colors.white}
        style={{ fontFamily: "Poppins_900Black" }}
      >
        Background music: {Math.round(musicVolume * 100)}%
      </Typo>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={musicVolume}
        onValueChange={(val) => setMusicVolume(val)}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.green}
      />

      <Typo
        size={19}
        color={colors.white}
        style={{ fontFamily: "Poppins_900Black" }}
      >
        Sound Effects: {Math.round(effectVolume * 100)}%
      </Typo>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={effectVolume}
        onValueChange={(val) => setEffectVolume(val)}
        minimumTrackTintColor={colors.green}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.green}
      />
    </View>
  );
}

export default AudioSettings

const styles = StyleSheet.create({
  container: {
    padding: verticalScale(20),
    justifyContent: "center",
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    borderRadius: radius._20,
    borderCurve: radius._30,
  },
  title: {
    fontFamily: "Poppins_900Black",
  },
  slider: { width: "100%", height: 40 },
});