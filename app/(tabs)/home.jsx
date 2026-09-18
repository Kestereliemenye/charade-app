import { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

import ScreenWrapper from "../../components/ScreenWrapper";
import AnimatedButton from "../../components/AnimatedButton";
import Herosection from "../../components/Herosection";
import RecentDecks from "../../components/RecentDecks";
import BgAudio from "../../components/BgAudio";
import Typo from "../../components/Typo";

import { colors, spacingX, spacingY } from "../../constants/theme";

const Home = () => {
  // Run every time Home becomes the active screen.
  useFocusEffect(
    useCallback(() => {
      const lockToPortrait = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP,
          );
        } catch (error) {
          console.error("Could not lock orientation:", error);
        }
      };

      lockToPortrait();
    }, []),
  );

  const openTutorial = () => {
    router.push("/Tutorial");
  };

  return (
    <ScreenWrapper
      showPattern
      showOverlay
      bgOpacity={0.4}
      overlayColor={colors.spalshBg_light}
      overlayOpacity={0.4}
    >
      <BgAudio />
      <View style={styles.container}>
        {/* Main home illustration and title */}
        <Herosection style={styles.heroSection} />

        {/* Main play button */}
        <View style={styles.playSection}>
          {/* <AnimatedButton /> */}

          <Typo size={14} color={colors.white} style={styles.playHint}>
            Choose a deck and challenge your friends!
          </Typo>
        </View>

        {/* Tutorial reminder */}
        <Pressable
          onPress={openTutorial}
          style={({ pressed }) => [
            styles.tutorialCard,
            pressed && styles.pressedCard,
          ]}
        >
          <View style={styles.tutorialIcon}>
            <Typo size={34}>📱</Typo>
          </View>

          <View style={styles.tutorialText}>
            <Typo size={20} color={colors.white} fontWeight="900">
              How to Play
            </Typo>

            <Typo
              size={14}
              color={colors.white}
              style={styles.tutorialDescription}
            >
              Learn how to choose a deck, hold the phone and tilt for correct or
              skipped answers.
            </Typo>
          </View>

          <Typo size={28} color={colors.gold || "#FFBE0B"} fontWeight="900">
            ›
          </Typo>
        </Pressable>

        {/* Recently played categories */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeading}>
            <View>
              <Typo size={23} color={colors.white} fontWeight="900">
                Recent Decks
              </Typo>

              <Typo
                size={13}
                color={colors.white}
                style={styles.sectionSubtitle}
              >
                Jump back into your favourite categories.
              </Typo>
            </View>
          </View>
        </View>
        <RecentDecks />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  heroSection: {
    marginBottom: 22,
  },

  playSection: {
    marginBottom: 28,
  },

  playHint: {
    marginTop: 10,
    textAlign: "center",
    opacity: 0.75,
  },

  tutorialCard: {
    width: "100%",
    minHeight: 120,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  pressedCard: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  tutorialIcon: {
    width: 65,
    height: 65,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,190,11,0.18)",
  },

  tutorialText: {
    flex: 1,
  },

  tutorialDescription: {
    marginTop: 5,
    lineHeight: 20,
    opacity: 0.8,
  },

  recentSection: {
    width: "100%",
  },

  sectionHeading: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionSubtitle: {
    marginTop: 3,
    opacity: 0.7,
  },
});
