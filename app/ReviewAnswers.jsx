import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "../components/Typo";
import { colors } from "../constants/theme";

const ReviewAnswers = () => {
  const { results, deckTitle } = useLocalSearchParams();

  const normalizedResults = Array.isArray(results) ? results[0] : results;

  const normalizedDeckTitle = Array.isArray(deckTitle)
    ? deckTitle[0]
    : deckTitle;

  let parsedResults = [];

  try {
    parsedResults = JSON.parse(normalizedResults || "[]");
  } catch (error) {
    console.error("Could not read round results:", error);
  }
const playAgain = () => {
  router.dismissAll();

  requestAnimationFrame(() => {
    router.push({
      pathname: "/Lobby",
      params: {
        deckTitle: normalizedDeckTitle,
      },
    });
  });
};



const chooseAnotherDeck = () => {
  router.dismissAll();

  requestAnimationFrame(() => {
    router.replace("/(tabs)/decks");
  });
};

  const renderAnswer = ({ item }) => {
    const isCorrect = item.result === "correct";

    return (
      <View
        style={[
          styles.answerCard,
          {
            borderColor: isCorrect ? "#2ECC71" : "#FFBE0B",
          },
        ]}
      >
        <View
          style={[
            styles.resultIcon,
            {
              backgroundColor: isCorrect ? "#2ECC71" : "#FFBE0B",
            },
          ]}
        >
          <Typo size={20} color={colors.white}>
            {isCorrect ? "✓" : "↪"}
          </Typo>
        </View>

        <Typo
          size={15}
          color={colors.white}
          fontWeight="700"
          style={styles.answerText}
        >
          {item.question}
        </Typo>

        <Typo
          size={11}
          color={isCorrect ? "#7CFFAA" : "#FFD95A"}
          fontWeight="700"
        >
          {isCorrect ? "Correct" : "Skipped"}
        </Typo>
      </View>
    );
  };

  return (
    <ScreenWrapper
      showPattern
      showOverlay
      overlayColor="#006B3C"
      overlayOpacity={0.9}
    >
      <View style={styles.container}>
        <Typo
          size={29}
          color={colors.white}
          fontWeight="900"
          style={styles.heading}
        >
          Round Answers
        </Typo>

        <Typo size={14} color={colors.white} style={styles.subtitle}>
          Review the words you got correct or skipped.
        </Typo>

        <FlatList
          data={parsedResults}
          renderItem={renderAnswer}
          keyExtractor={(item, index) => item.id || String(index)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Typo size={17} color={colors.white} style={styles.emptyText}>
              No answers were recorded for this round.
            </Typo>
          }
        />

        <View style={styles.buttons}>
          <Pressable onPress={playAgain} style={styles.primaryButton}>
            <Typo size={17} color={colors.white} fontWeight="900">
              Play Again
            </Typo>
          </Pressable>

          <Pressable onPress={chooseAnotherDeck} style={styles.secondaryButton}>
            <Typo size={16} color={colors.white} fontWeight="700">
              Choose Another Deck
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ReviewAnswers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  heading: {
    marginTop: 15,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 18,
    textAlign: "center",
    opacity: 0.75,
  },

  listContent: {
    paddingBottom: 15,
  },

  row: {
    gap: 12,
  },

  answerCard: {
    flex: 1,
    minHeight: 125,
    marginBottom: 12,
    padding: 12,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  resultIcon: {
    width: 32,
    height: 32,
    marginBottom: 7,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  answerText: {
    marginBottom: 6,
    textAlign: "center",
  },

  emptyText: {
    marginTop: 50,
    textAlign: "center",
  },

  buttons: {
    paddingTop: 10,
    paddingBottom: 25,
    gap: 10,
  },

  primaryButton: {
    paddingVertical: 14,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#FFBE0B",
  },

  secondaryButton: {
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
