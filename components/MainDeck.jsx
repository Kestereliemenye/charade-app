import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import DeckCards from "./DeckCards";
import { DECK_DATA } from "../constants/deckData";
import { verticalScale } from "../utils/styling";

const MainDeck = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={DECK_DATA}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <DeckCards title={item.title} icon={item.icon} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // This creates the 2-column grid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default MainDeck;

const styles = StyleSheet.create({
  container: {
    borderRadius: radius._30,
    overflow: "hidden", // Ensures content doesn't bleed out of rounded corners
    flex:1,
  },
  listContent: {
  
      alignItems: "center",
  },
  cardWrapper: {
    margin: spacingX._20, // Adjust spacing between cards
  },
});
