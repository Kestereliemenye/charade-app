import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "expo-router";

import Typo from "./Typo";
import DeckCards from "./DeckCards";

import { DECK_DATA } from "../constants/deckData";
import { colors, spacingX } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import { getRecentDeckIds } from "../utils/recentDecks";

const RecentDecks = ({ style }) => {
  const [recentDecks, setRecentDecks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadRecentDecks = async () => {
        const recentIds = await getRecentDeckIds();

        // Preserve the order in which the deck IDs were saved.
        const decks = recentIds
          .map((id) => DECK_DATA.find((deck) => deck.id === id))
          .filter(Boolean);

        if (isActive) {
          setRecentDecks(decks);
        }
      };

      loadRecentDecks();

      return () => {
        isActive = false;
      };
    }, []),
  );

  if (recentDecks.length === 0) {
    return (
      <View style={[styles.emptyContainer, style]}>
        <Typo size={14} color={colors.white} style={styles.emptyText}>
          Your recently played decks will appear here.
        </Typo>
      </View>
    );
  }

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {recentDecks.map((item) => (
          <DeckCards
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            style={styles.deckCard}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentDecks;
const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacingX._10,
  },

  deckCard: {
    marginRight: verticalScale(15),
    width:verticalScale(140),
  },

  emptyContainer: {
    paddingVertical: 25,
    alignItems: "center",
  },

  emptyText: {
    textAlign: "center",
    opacity: 0.7,
  },
});
