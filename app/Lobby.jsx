import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router"; // import the hook
import ScreenWrapper from "../components/ScreenWrapper";
import * as Icons from "phosphor-react-native";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import BackBtn from "../components/BackBtn";
import { DECK_DATA } from "../constants/deckData";
import Typo from "../components/Typo";
import { verticalScale } from "../utils/styling";
import Button from "../components/Button";
import GameSlider from "../components/GameSlider";
import { Image } from "expo-image";

const Lobby = () => {
  // Destructure the parameter you passed from the DeckCards

  const { deckTitle } = useLocalSearchParams();

  // CHECK FOR DATA
  const currentDeck = DECK_DATA.find((deck) => deck.title === deckTitle);

  const [time, setTime] = useState(60);
  const [rounds, setRounds] = useState(10);
  return (
    <ScreenWrapper
      style={{ flex: 1 }}
      bgImage={currentDeck?.bgImage}
      showPattern={true}
    >
      <BackBtn />
      <Typo size={35} style={styles.header} fontWeight={"700"}>
        {deckTitle}
      </Typo>
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={currentDeck?.lobbyImg}
            style={styles.lobbyImage}
            contentFit="cover" // equivalent to resizeMode="cover"
            transition={500} // Beautiful cross-fade transition
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
          <GameSlider
            label="Duration"
            value={time}
            min={30}
            max={90}
            step={5}
            unit="s"
            onValueChange={setTime}
            style={styles.sliderContainer}
          />
        </View>
        <Button
          style={{
            // paddingVertical: spacingY._30,
            paddingHorizontal: spacingX._60,
          }}
        >
          <Typo
            size={25}
            color={colors.white}
            style={{ fontFamily: "Poppins_900Black" }}
          >
            Start Game
          </Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default Lobby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#fff", // Or your app's theme color
    paddingVertical: spacingY._10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  header: {
    color: colors.white,
    textAlign: "center",
    marginTop: verticalScale(20),
    fontFamily: "Poppins_900Black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 0.5,
  },
  body: {
    backgroundColor: colors.white,
    // flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    justifyContent: "space-between",
    width: verticalScale(300),
    height: verticalScale(450),
    borderRadius: radius._30,
  },
  lobbyImage: {
    width: "100%",
    height: verticalScale(250), // Give it a fixed height or flex
  },
  sliderContainer: {
    paddingHorizontal: 20,
    // marginTop: verticalScale(50),
  },
});
