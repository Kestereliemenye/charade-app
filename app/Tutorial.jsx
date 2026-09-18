import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";

import ScreenWrapper from "../components/ScreenWrapper";
import Typo from "../components/Typo";
import { colors } from "../constants/theme";
import { verticalScale } from "../utils/styling";

const tutorialSlides = [
  {
    id: "1",
    emoji: "🃏",
    title: "Choose a Deck",
    description:
      "Pick from a variety of Nigerian-themed decks that match your mood.",
    instructions: [
      {
        heading: "Choose a category:",
        text: "Select categories such as Football, Nollywood, Tech, Market, Party or Classic.",
      },
      {
        heading: "Choose your time:",
        text: "Select how long you want the round to last before starting the game.",
      },
    ],
  },
  {
    id: "2",
    emoji: "🎭",
    image: require("../assets/images/clues_HTP.png"),
    title: "Category Clues",
    description:
      "Get your teammates ready before the sixty-second hustle begins.",
    instructions: [
      {
        heading: "The Setup:",
        text: "The person holding the phone announces the selected category to their team.",
      },
      {
        heading: "The Clue:",
        text: "Your teammates describe the word without saying the actual answer.",
      },
    ],
  },
  {
    id: "3",
    emoji: "📱",
    title: "Hold and Tilt",
    description:
      "Hold the phone horizontally against your forehead so everyone else can see the word.",
    instructions: [
      {
        heading: "Correct answer:",
        text: "Tilt the phone in the correct direction to add one point to your score.",
      },
      {
        heading: "Skip a word:",
        text: "Tilt the phone in the opposite direction to skip and move to the next word.",
      },
    ],
  },
  {
    id: "4",
    emoji: "🏆",
    image: require("../assets/images/timer_HTP.png"),
    title: "Beat the Timer",
    description:
      "Guess as many words as possible before the timer reaches zero.",
    instructions: [
      {
        heading: "Keep moving:",
        text: "A new word appears after every correct answer or skipped question.",
      },
      {
        heading: "Final score:",
        text: "Your total score appears when the round ends. Challenge your friends to beat it!",
      },
    ],
  },
];

const Tutorial = () => {
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === tutorialSlides.length - 1;

  const goToSlide = (index) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setCurrentSlide(index);
  };

  const finishTutorial = () => {
    // If Tutorial was opened from Home, return to the
    // existing Home screen instead of creating another one.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      finishTutorial();
      return;
    }

    goToSlide(currentSlide + 1);
  };

  const handleBack = () => {
    if (isFirstSlide) return;

    goToSlide(currentSlide - 1);
  };

  const handleScrollEnd = (event) => {
    const horizontalOffset = event.nativeEvent.contentOffset.x;

    const newIndex = Math.round(horizontalOffset / width);

    setCurrentSlide(newIndex);
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Typo
          size={32}
          color={colors.white}
          fontWeight="900"
          style={styles.title}
        >
          {item.title}
        </Typo>

        <Typo size={16} color={colors.white} style={styles.description}>
          {item.description}
        </Typo>

        <View style={styles.illustration}>
          {item.image ? (
            <Image
              source={item.image}
              style={styles.tutorialImage}
              contentFit="contain"
              transition={300}
            />
          ) : (
            <Typo size={110}>{item.emoji}</Typo>
          )}
        </View>

        <View style={styles.instructions}>
          {item.instructions.map((instruction, index) => (
            <Typo
              key={`${item.id}-${index}`}
              size={16}
              color={colors.white}
              style={styles.instructionText}
            >
              <Typo size={16} color={colors.white} fontWeight="900">
                {instruction.heading}{" "}
              </Typo>

              {instruction.text}
            </Typo>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper
      showPattern
      showOverlay
      overlayColor="#006B3C"
      overlayOpacity={0.9}
      style={styles.screen}
    >
      <Pressable
        onPress={finishTutorial}
        style={({ pressed }) => [
          styles.skipButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Typo size={15} color={colors.white} fontWeight="700">
          Skip
        </Typo>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={tutorialSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={({ index }) => {
          flatListRef.current?.scrollToOffset({
            offset: width * index,
            animated: true,
          });
        }}
      />

      <View style={styles.bottomSection}>
        <Pressable
          onPress={handleBack}
          disabled={isFirstSlide}
          style={({ pressed }) => [
            styles.backButton,
            isFirstSlide && styles.hiddenButton,
            pressed && !isFirstSlide && styles.pressedButton,
          ]}
        >
          <Typo size={30} color={colors.white} fontWeight="900">
            ←
          </Typo>
        </Pressable>

        <View style={styles.dotsContainer}>
          {tutorialSlides.map((slide, index) => (
            <Pressable
              key={slide.id}
              onPress={() => goToSlide(index)}
              style={[styles.dot, currentSlide === index && styles.activeDot]}
            />
          ))}
        </View>

        <Pressable
          onPress={handleNext}
          style={({ pressed }) => [
            styles.nextButton,
            isLastSlide && styles.startButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Typo size={17} color={colors.white} fontWeight="900">
            {isLastSlide ? "Start" : "Next"}
          </Typo>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  screen: {
    paddingTop: verticalScale(70),
    paddingBottom: verticalScale(40),
  },

  skipButton: {
    position: "absolute",
    top: verticalScale(50),
    right: 18,
    paddingHorizontal: 18,
    paddingVertical: verticalScale(6),
    borderRadius: 20,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  slide: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 30,
    alignItems: "center",
  },

  title: {
    textAlign: "center",
  },

  description: {
    maxWidth: 330,
    marginTop: 12,
    lineHeight: 23,
    textAlign: "center",
    opacity: 0.9,
  },

  illustration: {
    width: 250,
    height: 250,
    marginVertical: 25,
    borderRadius: 30,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  tutorialImage: {
    width: "100%",
    height: "100%",
  },

  instructions: {
    width: "100%",
    maxWidth: 380,
    gap: 18,
  },

  instructionText: {
    lineHeight: 23,
    textAlign: "center",
  },

  bottomSection: {
    minHeight: 70,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBE0B",
  },

  hiddenButton: {
    opacity: 0,
  },

  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,190,11,0.3)",
  },

  activeDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#FFBE0B",
  },

  nextButton: {
    minWidth: 90,
    height: 52,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderColor: colors.white,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBE0B",
  },

  startButton: {
    minWidth: 105,
  },

  pressedButton: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
});
