import { Accelerometer, Gyroscope } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { colors } from "../constants/theme";
import Typo from "../components/Typo";
import { DECK_DATA } from "../constants/deckData";

const GamePlay = () => {
  const { duration, categoryTitle, deckTitle } = useLocalSearchParams();
  const initialTime = duration ? parseInt(duration, 10) : 60;

  const selectedDeck = DECK_DATA.find((deck) => deck.title === categoryTitle);
  const [questions, setQuestions] = useState(() => {
    const rawQuestions = selectedDeck?.questions || ["Nollywood Word Here"];
    return [...rawQuestions].sort(() => Math.random() - 0.5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isHoriz, setIsHoriz] = useState(false);
  const [bgColor, setBgColor] = useState(colors.primary);

  // New state to manage the feedback modal/popup text ("CORRECT" or "WRONG")
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const isProcessingRef = useRef(false);

  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE,
      );
    }
    lockOrientation();

  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const subscription = Accelerometer.addListener(({ y }) => {
      const isLandscape = Math.abs(y) < 0.5;
      setIsHoriz(isLandscape);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Gyroscope.addListener(({ y }) => {
      if (isProcessingRef.current || timeLeft <= 0 || !isHoriz) return;

      if (y < -4) {
        handleSkip();
      } else if (y > 4) {
        handleCorrect();
      }
    });

    return () => subscription.remove();
  }, [timeLeft, isHoriz, currentIndex]);

 useEffect(() => {
   if (timeLeft <= 0) {
     // Add a slight 1-second delay bore movin to score screen
     const timeout = setTimeout(() => {
       router.replace({
         pathname: "/ScoreScreen",
         params: { finalScore: score, deckTitle: deckTitle },
       });
     }, 1000);

     return () => clearTimeout(timeout);
   }

   if (!isHoriz) return;

   const timer = setInterval(() => {
     setTimeLeft((prev) => prev - 1);
   }, 1000);

   return () => clearInterval(timer);
 }, [isHoriz, timeLeft, score, deckTitle]);
  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handleCorrect = () => {
    isProcessingRef.current = true;
    setScore((prev) => prev + 1);
    setBgColor(colors.correct || "#2ecc71");
    setFeedbackMessage("CORRECT! 🎉"); // Trigger popup
    nextWord();

    setTimeout(() => {
      setBgColor(colors.primary);
      setFeedbackMessage(null); // Clear popup after 1 second
      isProcessingRef.current = false;
    }, 1000);
  };

  const handleSkip = () => {
    isProcessingRef.current = true;
    setBgColor(colors.skip || "#e74c3c");
    setFeedbackMessage("WRONG! ❌"); // Trigger popup
    nextWord();

    setTimeout(() => {
      setBgColor(colors.primary);
      setFeedbackMessage(null); // Clear popup after 1 second
      isProcessingRef.current = false;
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {!isHoriz ? (
        <View style={styles.alertContainer}>
          <Typo
            size={28}
            color={colors.white}
            fontWeight="700"
            style={{ textAlign: "center" }}
          >
            Turn Phone 📱 Horizontally! against your forehead to begin the
            round.
          </Typo>
        </View>
      ) : feedbackMessage ? (
        // Popup Modal overlay for 1 second during correct/skip transition
        <View style={styles.popupContainer}>
          <Typo
            size={55}
            color={colors.white}
            fontWeight="900"
            style={{ textAlign: "center" }}
          >
            {feedbackMessage}
          </Typo>
        </View>
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Typo size={24} color={colors.white} fontWeight="700">
              {timeLeft}s
            </Typo>
          </View>

          <View style={styles.wordContainer}>
            <Typo
              size={42}
              color={colors.white}
              fontWeight="900"
              style={{ textAlign: "center" }}
            >
              {questions[currentIndex]}
            </Typo>
          </View>

          <View style={styles.scoreContainer}>
            <Typo size={18} color={colors.gold} fontWeight="700">
              Score: {score}
            </Typo>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  alertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  timerContainer: {
    position: "absolute",
    top: 20,
    right: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
  },
  scoreContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
  },
  wordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default GamePlay;
