import { StyleSheet, View } from "react-native";

import { useCallback, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router"; // import the hook
import ScreenWrapper from "../components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import BackBtn from "../components/BackBtn";
import { DECK_DATA } from "../constants/deckData";
import Typo from "../components/Typo";
import { verticalScale } from "../utils/styling";
import Button from "../components/Button";
import GameTimer from "../components/GameSlider";
import { Image } from "expo-image";
import { saveRecentDeck } from "../utils/recentDecks";

const Lobby = () => {
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }, []),
  );
  const { deckTitle } = useLocalSearchParams();
  const router = useRouter();

  // CHECK FOR DATA
  const currentDeck = DECK_DATA.find((deck) => deck.title === deckTitle);

  const [time, setTime] = useState(30);
  const [isStarting, setIsStarting] = useState(false); //  start delay state

  const handleStartGame = async () => {
    if (isStarting) return; // Prevent multiple clicks
    setIsStarting(true);

    // Record it as recently played
    await saveRecentDeck(currentDeck.id);
    // 1-second delay before pushing to GamePlay
    setTimeout(() => {
      router.replace({
        pathname: "/GamePlay",
        params: {
          duration: time,
          deckTitle: deckTitle,
          categoryTitle: deckTitle,
        },
      });
    }, 3000);
  };

  if (!currentDeck) {
    return (
      <ScreenWrapper showPattern>
        <View style={styles.errorContainer}>
          <Typo size={20} color={colors.white}>
            Deck not found
          </Typo>

          <Button onPress={() => router.replace("/(tabs)/decks")}>
            <Typo color={colors.white}>Back to Decks</Typo>
          </Button>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      style={{ flex: 1, paddingVertical: spacingY._30 }}
      showPattern={true}
      overlayColor={colors.spalshBg_light}
      showOverlay
      overlayOpacity={0.8}
    >
      <View style={styles.topBtn}>
        <BackBtn onPress={() => router.replace("/(tabs)/home")} />
        <Typo size={35} style={styles.header} fontWeight={"700"}>
          {deckTitle}
        </Typo>
      </View>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={currentDeck?.lobbyImage}
            style={styles.lobbyImage}
            contentFit="contain"
            transition={500}
          />
          <Typo
            size={13}
            color={colors.black}
            style={{
              textAlign: "center",
              marginHorizontal: 15,
              lineHeight: 18,
              marginTop: 10,
            }}
          >
            {currentDeck?.intro}
          </Typo>
          <View style={styles.timerSection}>
            <Typo
              size={16}
              color={colors.black}
              fontWeight="700"
              style={styles.timerLabel}
            >
              Round Duration
            </Typo>

            <GameTimer
              value={time}
              min={5}
              max={120}
              step={5}
              onValueChange={setTime}
            />
          </View>
        </View>
        <Button
          style={{
            paddingHorizontal: spacingX._60,
          }}
          onPress={handleStartGame}
          disabled={isStarting} // Disable button while starting
        >
          <Typo
            size={25}
            color={colors.white}
            style={{ fontFamily: "Poppins_900Black" }}
          >
            {isStarting ? "Get Ready! 🎬" : "Start Game"}
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Lobby;

const styles = StyleSheet.create({
  topBtn: {
    // marginVertical: spacingY._30
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: spacingY._5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  header: {
    color: colors.white,
    textAlign: "center",
    // marginTop: verticalScale(20),
    fontFamily: "Poppins_900Black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 0.5,
  },
  body: {
    backgroundColor: colors.white,
    flexDirection: "column",
    overflow: "hidden",
    justifyContent: "space-between",
    width: verticalScale(300),
    height: verticalScale(450),
    borderRadius: radius._30,
  },
  lobbyImage: {
    width: "100%",
    height: verticalScale(250),
  },
  sliderContainer: {
    paddingHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  timerSection: {
    width: "100%",
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },

  timerLabel: {
    marginBottom: verticalScale(15),
    textAlign: "center",
  },
});
