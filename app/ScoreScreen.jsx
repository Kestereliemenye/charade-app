import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "../components/Typo";
import Button from "../components/Button";
import { colors } from "../constants/theme";
import { DECK_DATA } from "../constants/deckData";

const ScoreScreen = () => {
  const { finalScore, deckTitle, results } = useLocalSearchParams();
    const [orientationReady, setOrientationReady] = useState(false);

  const normalizedDeckTitle = Array.isArray(deckTitle)
    ? deckTitle[0]
    : deckTitle;

  const normalizedResults = Array.isArray(results) ? results[0] : results;

  const currentDeck = DECK_DATA.find(
    (deck) => deck.title === normalizedDeckTitle,
  );

useFocusEffect(
  useCallback(() => {
    let screenIsActive = true;

    const lockToPortrait = async () => {
      try {
        setOrientationReady(false);

        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );

        if (screenIsActive) {
          setOrientationReady(true);
        }
      } catch (error) {
        console.error("Could not lock score screen to portrait:", error);

        // Still render the screen if orientation locking fails.
        if (screenIsActive) {
          setOrientationReady(true);
        }
      }
    };

    lockToPortrait();

    return () => {
      screenIsActive = false;
    };
  }, []),
);

  const continueToReview = () => {
    router.replace({
      pathname: "/ReviewAnswers",
      params: {
        deckTitle: normalizedDeckTitle,
        finalScore: String(finalScore || 0),
        results: normalizedResults || "[]",
      },
    });
  };

  return (
    <ScreenWrapper
      showPattern
      showOverlay
      overlayColor="#008C51"
      overlayOpacity={0.9}
    >
      <View style={styles.container}>
        <Typo size={28} color={colors.white} fontWeight="900">
          Your Score!
        </Typo>

        <Image
          source={currentDeck?.scoreImage || currentDeck?.image}
          style={styles.celebrationImage}
          contentFit="contain"
          transition={300}
        />

        <Typo size={75} color={colors.white} fontWeight="900">
          {finalScore || 0}
        </Typo>

        <Button onPress={continueToReview} style={styles.continueButton}>
          <Typo size={18} color={colors.white} fontWeight="900">
            Continue
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },

  celebrationImage: {
    width: "85%",
    height: 300,
  },

  continueButton: {
    width: "100%",
    paddingVertical: 14,
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#FFBE0B",
  },
});
