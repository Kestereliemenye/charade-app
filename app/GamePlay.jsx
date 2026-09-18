import { Accelerometer, Gyroscope } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "../constants/theme";
import Typo from "../components/Typo";
import { DECK_DATA } from "../constants/deckData";

const shuffleQuestions = (questions) => {
  const shuffledQuestions = [...questions];

  for (let index = shuffledQuestions.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledQuestions[index], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[index],
    ];
  }

  return shuffledQuestions;
};

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

const normalizeParam = (param) => {
  return Array.isArray(param) ? param[0] : param;
};

const GamePlay = () => {
  const params = useLocalSearchParams();

  const normalizedDeckTitle = normalizeParam(params.deckTitle);
  const normalizedDuration = normalizeParam(params.duration);

  const parsedDuration = Number.parseInt(normalizedDuration, 10);

  const initialTime =
    Number.isNaN(parsedDuration) || parsedDuration <= 0 ? 60 : parsedDuration;

  const selectedDeck = DECK_DATA.find(
    (deck) => deck.title === normalizedDeckTitle,
  );

  const questions = useMemo(() => {
    const deckQuestions = selectedDeck?.questions;

    if (!Array.isArray(deckQuestions) || deckQuestions.length === 0) {
      return ["No questions available"];
    }

    return shuffleQuestions(deckQuestions);
  }, [normalizedDeckTitle]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isHoriz, setIsHoriz] = useState(false);
  const [bgColor, setBgColor] = useState(colors.primary);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [orientationReady, setOrientationReady] = useState(false);

  /*
   * Refs are used inside sensor and timer callbacks so those callbacks
   * always receive the latest values.
   */
  const timeLeftRef = useRef(initialTime);
  const scoreRef = useRef(0);
  const isHorizRef = useRef(false);
  const currentQuestionRef = useRef(questions[0] || null);

  const isProcessingRef = useRef(false);
  const hasGameEndedRef = useRef(false);
  const resultsRef = useRef([]);

  const feedbackTimeoutRef = useRef(null);
  const navigationTimeoutRef = useRef(null);

  /*
   * Reset every value whenever a genuinely new round begins.
   */
  // useEffect(() => {
  //   timeLeftRef.current = initialTime;
  //   scoreRef.current = 0;
  //   isHorizRef.current = false;
  //   isProcessingRef.current = false;
  //   hasGameEndedRef.current = false;
  //   resultsRef.current = [];
  //   currentQuestionRef.current = questions[0] || null;

  //   setCurrentIndex(0);
  //   setScore(0);
  //   setTimeLeft(initialTime);
  //   setIsHoriz(false);
  //   setBgColor(colors.primary);
  //   setFeedbackMessage(null);
  //   setOrientationReady(false);
  // }, [initialTime, normalizedDeckTitle, questions]);

  /*
   * Keep the current question available to the sensor callback.
   */
  useEffect(() => {
    currentQuestionRef.current =
      questions[currentIndex] || questions[0] || null;
  }, [currentIndex, questions]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    isHorizRef.current = isHoriz;
  }, [isHoriz]);

  const recordResult = useCallback((result) => {
    const currentQuestion = currentQuestionRef.current;

    if (!currentQuestion || hasGameEndedRef.current) {
      return;
    }

    resultsRef.current = [
      ...resultsRef.current,
      {
        id: `${Date.now()}-${resultsRef.current.length}`,
        question: currentQuestion,
        result,
      },
    ];
  }, []);

  const nextWord = useCallback(() => {
    if (questions.length === 0) return;

    setCurrentIndex((previousIndex) => (previousIndex + 1) % questions.length);
  }, [questions.length]);

  const showFeedback = useCallback((message, color) => {
    if (hasGameEndedRef.current) return;

    isProcessingRef.current = true;

    setFeedbackMessage(message);
    setBgColor(color);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      /*
       * Do not change the screen back to green if time has already ended.
       */
      if (hasGameEndedRef.current) return;

      setFeedbackMessage(null);
      setBgColor(colors.primary);
      isProcessingRef.current = false;
    }, 800);
  }, []);

  const handleCorrect = useCallback(() => {
    if (
      isProcessingRef.current ||
      hasGameEndedRef.current ||
      timeLeftRef.current <= 0
    ) {
      return;
    }

    recordResult("correct");

    setScore((previousScore) => {
      const newScore = previousScore + 1;
      scoreRef.current = newScore;

      return newScore;
    });

    nextWord();
    showFeedback("CORRECT! 🎉", colors.correct || "#2ECC71");
  }, [nextWord, recordResult, showFeedback]);

  const handleSkip = useCallback(() => {
    if (
      isProcessingRef.current ||
      hasGameEndedRef.current ||
      timeLeftRef.current <= 0
    ) {
      return;
    }

    recordResult("skipped");
    nextWord();
    showFeedback("SKIPPED! ⏭️", colors.skip || "#E74C3C");
  }, [nextWord, recordResult, showFeedback]);

  /*
   * Lock the gameplay screen to landscape.
   */
  useEffect(() => {
    let isMounted = true;

    const prepareGameScreen = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE,
        );
      } catch (error) {
        console.error("Could not lock gameplay to landscape:", error);
      } finally {
        if (isMounted) {
          setOrientationReady(true);
        }
      }
    };

    prepareGameScreen();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Detect whether the phone is horizontal.
   */
  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const accelerometerSubscription = Accelerometer.addListener(({ y }) => {
      if (hasGameEndedRef.current) return;

      const phoneIsHorizontal = Math.abs(y) < 0.5;

      isHorizRef.current = phoneIsHorizontal;
      setIsHoriz(phoneIsHorizontal);
    });

    return () => {
      accelerometerSubscription.remove();
    };
  }, []);

  /*
   * Detect correct and skipped gestures.
   */
  useEffect(() => {
    Gyroscope.setUpdateInterval(100);

    const gyroscopeSubscription = Gyroscope.addListener(({ y }) => {
      if (
        hasGameEndedRef.current ||
        isProcessingRef.current ||
        timeLeftRef.current <= 0 ||
        !isHorizRef.current
      ) {
        return;
      }

      if (y < -4) {
        handleSkip();
      } else if (y > 4) {
        handleCorrect();
      }
    });

    return () => {
      gyroscopeSubscription.remove();
    };
  }, [handleCorrect, handleSkip]);

  /*
   * Start the countdown only when the phone is horizontal.
   */
  useEffect(() => {
    if (
      !isHoriz ||
      !orientationReady ||
      hasGameEndedRef.current ||
      timeLeftRef.current <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (hasGameEndedRef.current) return;

      setTimeLeft((previousTime) => {
        const nextTime = Math.max(0, previousTime - 1);

        timeLeftRef.current = nextTime;

        return nextTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isHoriz, orientationReady]);

  /*
   * End the game exactly once.
   */
  useEffect(() => {
    if (timeLeft > 0 || hasGameEndedRef.current) {
      return;
    }

    hasGameEndedRef.current = true;
    isProcessingRef.current = true;
    timeLeftRef.current = 0;

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    setBgColor("#1479D2");
    setFeedbackMessage("TIME’S UP! ⏰");

    navigationTimeoutRef.current = setTimeout(() => {
      /*
       * Do not lock portrait here.
       * ScoreScreen is responsible for locking itself to portrait.
       */
      router.replace({
        pathname: "/ScoreScreen",
        params: {
          finalScore: String(scoreRef.current),
          deckTitle: normalizedDeckTitle || "",
          results: JSON.stringify(resultsRef.current),
        },
      });
    }, 1800);

    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
  }, [timeLeft, normalizedDeckTitle]);

  /*
   * Clear every remaining timeout when GamePlay unmounts.
   * Sensor subscriptions are removed in their own effects.
   */
  useEffect(() => {
    return () => {
      hasGameEndedRef.current = true;
      isProcessingRef.current = true;

      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }

      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
  }, []);

  if (!orientationReady) {
    return (
      <View style={styles.loadingContainer}>
        <Typo size={24} color={colors.white} fontWeight="900">
          Get Ready! 🎬
        </Typo>
      </View>
    );
  }

  const screenBackgroundColor = timeLeft === 0 ? "#1479D2" : bgColor;
  return (
    <View
      style={[styles.container, { backgroundColor: screenBackgroundColor }]}
    >
      {timeLeft === 0 ? (
        <View style={styles.popupContainer}>
          <Typo
            size={58}
            color={colors.white}
            fontWeight="900"
            style={styles.centeredText}
          >
            TIME’S UP! ⏰
          </Typo>
        </View>
      ) : !isHoriz ? (
        <View style={styles.alertContainer}>
          <Typo
            size={28}
            color={colors.white}
            fontWeight="700"
            style={styles.centeredText}
          >
            Turn the phone horizontally and place it against your forehead to
            begin! 📱
          </Typo>
        </View>
      ) : feedbackMessage ? (
        <View style={styles.popupContainer}>
          <Typo
            size={55}
            color={colors.white}
            fontWeight="900"
            style={styles.centeredText}
          >
            {feedbackMessage}
          </Typo>
        </View>
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Typo size={25} color={colors.white} fontWeight="900">
              {formatTime(timeLeft)}
            </Typo>
          </View>

          <View style={styles.wordContainer}>
            <Typo
              size={42}
              color={colors.white}
              fontWeight="900"
              style={styles.centeredText}
            >
              {questions[currentIndex] || "No question available"}
            </Typo>
          </View>

          <View style={styles.scoreContainer}>
            <Typo size={19} color={colors.gold || "#FFBE0B"} fontWeight="900">
              Score: {score}
            </Typo>
          </View>
        </>
      )}
    </View>
  );
};

export default GamePlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },

  alertContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  popupContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  timerContainer: {
    position: "absolute",
    top: 20,
    right: 30,
    minWidth: 100,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  scoreContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
  },

  wordContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  centeredText: {
    textAlign: "center",
  },
});
