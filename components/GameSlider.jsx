import React from "react";
import { View, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Typo from "./Typo";
import { colors } from "@/constants/theme";

const GameSlider = ({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
    unit = "",
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typo
          size={16}
          color={colors.black}
          style={[styles.label, { fontFamily: "Poppins_900Black" }]}
        >
          {label}
        </Typo>
        <View style={styles.valueContainer}>
          <Typo
            size={18}
            color={colors.gold}
            style={[styles.valueText, { fontFamily: "Poppins_900Black" }]}
          >
            {value}
            {unit}
          </Typo>
        </View>
      </View>

      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onValueChange}
          // The "filled" part of the track
          minimumTrackTintColor={"#FFD700"}
          // The "empty" part of the track
          maximumTrackTintColor="rgba(255,255,255,0.2)"
          // The circular knob
          thumbTintColor={colors.white}
        />
      </View>
    </View>
  );
};

export default GameSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  valueContainer: {
    backgroundColor: colors.green, // Deep green background for value
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  sliderWrapper: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)", // Very subtle track background
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
