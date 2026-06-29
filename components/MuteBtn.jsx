import { TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AudioContext } from "../contexts/AudioContext";
// Import the icons directly by name
import { SpeakerSimpleSlash, SpeakerSimpleHigh } from "phosphor-react-native";
import { colors } from "../constants/theme";
import { verticalScale } from "../utils/styling";

const MuteBtn = () => {
  const { isMusicMuted, toggleMute } = useContext(AudioContext);

  return (
    <TouchableOpacity onPress={toggleMute} style={styles.button}>
      {isMusicMuted ? (
        <SpeakerSimpleSlash size={32} color={colors.green} weight="fill" />
      ) : (
        <SpeakerSimpleHigh size={32} color={colors.green} weight="fill" />
      )}
    </TouchableOpacity>
  );
};

export default MuteBtn;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop:verticalScale(20)
  },
});
