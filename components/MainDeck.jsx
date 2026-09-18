import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import Typo from "./Typo";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import { DECK_DATA } from "../constants/deckData";
import { verticalScale } from "../utils/styling";

const MainDeck = ({ style }) => {
  const recentDeck = DECK_DATA[0];

  const leftDecks = DECK_DATA.filter((_, index) => index % 2 === 0);

  const rightDecks = DECK_DATA.filter((_, index) => index % 2 !== 0);

  const openDeck = (deck) => {
    router.push({
      pathname: "/Lobby",
      params: {
        deckTitle: deck.title,
      },
    });
  };

  const playRandomDeck = () => {
    const randomIndex = Math.floor(Math.random() * DECK_DATA.length);

    const randomDeck = DECK_DATA[randomIndex];

    openDeck(randomDeck);
  };

  const renderDeckCard = (deck) => (
    <Pressable
      key={deck.id}
      onPress={() => openDeck(deck)}
      style={({ pressed }) => [styles.deckCard, pressed && styles.pressedCard]}
    >
      <Image
        source={deck.image}
        style={styles.deckImage}
        contentFit="contain"
        transition={200}
      />

      <Typo
        size={17}
        color={colors.white}
        fontWeight="900"
        style={styles.deckTitle}
      >
        {deck.title}
      </Typo>
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Recently played deck */}
      {recentDeck && (
        <Pressable
          onPress={() => openDeck(recentDeck)}
          style={({ pressed }) => [
            styles.recentCard,
            pressed && styles.pressedCard,
          ]}
        >
          <View style={styles.recentText}>
            <Typo
              size={19}
              color={colors.white}
              fontWeight="900"
              numberOfLines={1}
            >
              {recentDeck.title}
            </Typo>

            <View style={styles.recentBadge}>
              <Typo size={11} color={colors.white} fontWeight="700">
                Your Recent Deck
              </Typo>
            </View>
          </View>

          <Image
            source={recentDeck.image}
            style={styles.recentImage}
            contentFit="contain"
          />
        </Pressable>
      )}

      {/* Staggered two-column layout */}
      <View style={styles.columns}>
        <View style={styles.column}>{leftDecks.map(renderDeckCard)}</View>

        <View style={styles.column}>
          <Pressable
            onPress={playRandomDeck}
            style={({ pressed }) => [
              styles.randomOuter,
              pressed && styles.pressedCard,
            ]}
          >
            <View style={styles.randomInner}>
              <Typo
                size={20}
                color={colors.white}
                fontWeight="900"
                style={styles.randomText}
              >
                Play{"\n"}Random
              </Typo>
            </View>
          </Pressable>

          {rightDecks.map(renderDeckCard)}
        </View>
      </View>
    </ScrollView>
  );
};

export default MainDeck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 130,
  },

  recentCard: {
    width: "100%",
    height: 90,
    marginBottom: 14,
    paddingLeft: verticalScale(15),
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFBE0B",
  },

  recentText: {
    flex: 1,
    height: "100%",
    paddingTop: 17,
    justifyContent: "space-between",
  },

  recentBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 7,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  recentImage: {
    width: 115,
    height: 90,
    // paddingVertical: spacingY._10,
  },

  columns: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  column: {
    flex: 1,
    gap: 12,
  },

  deckCard: {
    width: "100%",
    height: verticalScale(250),
    // paddingVertical: spacingY._5,
    paddingHorizontal: spacingX._5,
    borderWidth: verticalScale(2),
    borderColor: "#FFBE0B",
    borderRadius: radius._15,
    overflow: "hidden",
    alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "rgba(0,160,90,0.72)",
  },

  deckImage: {
    width: "100%",
    height: verticalScale(170),
  },

  deckTitle: {
    textAlign: "center",
    marginBottom: 5,
  },

  randomOuter: {
    width: "100%",
    height: 88,
    padding: 5,
    borderRadius: 14,
    backgroundColor: colors.white,
  },

  randomInner: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBE0B",
  },

  randomText: {
    textAlign: "center",
    lineHeight: 23,
  },

  pressedCard: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});
