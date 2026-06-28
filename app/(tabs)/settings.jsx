import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Typo from "../../components/Typo"; // Assuming you have your custom Typo
import { AudioContext } from "../../contexts/AudioContext";
import { colors } from "../../constants/theme";

const Settings = () => {
  const { musicVolume, setMusicVolume, effectVolume, setEffectVolume } =
    useContext(AudioContext);

  return (
    <View style={styles.container}>
      <Typo size={20} fontWeight="700" style={styles.title}>
        Audio Settings
      </Typo>

      <Typo size={16} color={colors.black}>
        Game Volume: {Math.round(musicVolume * 100)}%
      </Typo>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={musicVolume}
        onValueChange={(val) => setMusicVolume(val)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.primary}
      />
      <Typo size={16} color={colors.black}>
        Effects Volume: {Math.round(effectVolume * 100)}%
      </Typo>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={effectVolume}
        onValueChange={(val) => setEffectVolume(val)}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { marginBottom: 20 },
  slider: { width: "100%", height: 40 },
});

export default Settings;
