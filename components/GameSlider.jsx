import { Pressable, StyleSheet, View } from "react-native";
import Typo from "./Typo";
import { colors } from "../constants/theme";

const GameTimer = ({
  value,
  onValueChange,
  min = 5,
  max = 60,
  step = 5,
  style,
}) => {
  const decreaseTime = () => {
    onValueChange(Math.max(min, value - step));
  };

  const increaseTime = () => {
    onValueChange(Math.min(max, value + step));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const atMinimum = value <= min;
  const atMaximum = value >= max;

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={decreaseTime}
        disabled={atMinimum}
        style={({ pressed }) => [
          styles.controlButton,
          pressed && styles.pressedButton,
          atMinimum && styles.disabledButton,
        ]}
      >
        <Typo size={28} color={colors.white} fontWeight="900">
          −
        </Typo>
      </Pressable>

      <View style={styles.timeContainer}>
        <Typo
          size={27}
          color={colors.white}
          fontWeight="900"
          style={styles.time}
        >
          {formatTime(value)}
        </Typo>
      </View>

      <Pressable
        onPress={increaseTime}
        disabled={atMaximum}
        style={({ pressed }) => [
          styles.controlButton,
          pressed && styles.pressedButton,
          atMaximum && styles.disabledButton,
        ]}
      >
        <Typo size={28} color={colors.white} fontWeight="900">
          +
        </Typo>
      </Pressable>
    </View>
  );
};

export default GameTimer;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 62,
    paddingHorizontal: 7,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: "#006B3C",
  },

  controlButton: {
    width: 54,
    height: 42,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00965E",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 4,
  },

  pressedButton: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },

  disabledButton: {
    opacity: 0.35,
  },

  timeContainer: {
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  time: {
    textAlign: "center",
    fontFamily: "Poppins_900Black",
  },
});
