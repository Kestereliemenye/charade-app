import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from "./ScreenWrapper";
import Typo from "./Typo";
import { colors } from "../constants/theme";

const Herosection = ({style}) => {
  return (

      <View style={[styles.container, style]}>
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
      </View>
  );
}

export default Herosection

const styles = StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    fontFamily: "Poppins_900Black",
  },
});