import { Pressable, StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import MainDeck from "../../components/MainDeck";

import { colors, spacingX, spacingY } from "../../constants/theme";

const Decks = () => {
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }, []),
  );

  return (
    <ScreenWrapper
      showPattern
      bgOpacity={0.3}
      showOverlay
      overlayColor="#006B3C"
      overlayOpacity={0.7}
      style={styles.screen}
    >
      <View style={styles.headerContainer}>
        <Pressable style={styles.headerIcon}>
          <Typo size={25} color={colors.white}>
            ⚙
          </Typo>
        </Pressable>

        <Typo
          size={30}
          color={colors.white}
          fontWeight="900"
          style={styles.header}
        >
          Decks
        </Typo>

        <Pressable style={styles.headerIcon}>
          <Typo size={23} color={colors.white}>
            ⓘ
          </Typo>
        </Pressable>
      </View>

      <MainDeck />
    </ScreenWrapper>
  );
};

export default Decks;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: spacingY._25,
    paddingHorizontal: spacingX._15
  },

  headerContainer: {
    paddingHorizontal: 5,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    textAlign: "center",
    fontFamily: "Poppins_900Black",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 1,
  },

  headerIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  deckImage: {
    width: "100%",
    height: 115,
  },

  recentImage: {
    width: 115,
    height: 100,
  },

  deckTitle: {
    marginBottom: 6,
    textAlign: "center",
  },
});
