import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { colors } from "../constants/theme";
import Typo from "../components/Typo";
import Button from "../components/Button"; // Assuming you have a reusable Button component
import ScreenWrapper from "../components/ScreenWrapper";

const ScoreScreen = () => {
  const { finalScore, deckTitle } = useLocalSearchParams();

  // Unlock orientation back to portrait when entering the score screen
  useEffect(() => {
    async function resetOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    resetOrientation();
  }, []);

  return (
    <ScreenWrapper
      style={{ flex: 1, backgroundColor: colors.primary }}
      showPattern={true}
    >
      <View style={styles.container}>
        <Typo
          size={35}
          color={colors.white}
          fontWeight="900"
          style={{ textAlign: "center" }}
        >
          Time`s Up! 🎬
        </Typo>

        <View style={styles.scoreCard}>
          <Typo size={18} color={colors.white}>
            Your Total Score
          </Typo>
          <Typo
            size={60}
            color={colors.gold}
            fontWeight="900"
            style={{ marginVertical: 10 }}
          >
            {finalScore || 0}
          </Typo>
        </View>

        <View style={styles.buttonContainer}>
          {/* to home screen */}
          <Button
            onPress={() =>
              router.replace({
                pathname: "/Lobby",
                params: { deckTitle: deckTitle },
              })
            }
            style={[styles.button, { backgroundColor: colors.neutral700 }]}
          >
            <Typo size={18} color={colors.white} fontWeight="700">
              Back to Lobby
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 30,
    borderRadius: 20,
    marginVertical: 30,
    width: "80%",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
    alignItems: "center",
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
});

export default ScoreScreen;
