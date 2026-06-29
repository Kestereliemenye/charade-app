import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import MainDeck from "../../components/MainDeck";

const decks = () => {
  return (
    <ScreenWrapper
      showPattern={true}
      bgOpacity={0.3}
      style={{
        // paddingHorizontal: spacingX._20,
        // marginBottom: verticalScale(15),
      }}
    >
      <Typo size={35} style={styles.header} fontWeight={"700"}>
        DECKS
      </Typo>
      <MainDeck/>
      
    </ScreenWrapper>
  );
};

export default decks;

const styles = StyleSheet.create({
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
