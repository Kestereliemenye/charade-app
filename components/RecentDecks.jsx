import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { colors, spacingX } from "../constants/theme";
import DeckCards from "./DeckCards";
import { verticalScale } from "../utils/styling";
import { DECK_DATA } from "../constants/deckData";

const RecentDecks = ({ style }) => {

  return (
    <View style={style}>
      <Typo
        size={25}
        color={colors.subText}
        fontWeight={600}
        style={styles.textFmt}
      >
        YOUR RECENT DECKS
      </Typo>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacingX._10 }}
      >
        {DECK_DATA.map((item) => (
          <DeckCards key={item.id} title={item.title} icon={item.icon} style={{marginRight:verticalScale(20)}} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentDecks;

const styles = StyleSheet.create({
  textFmt: {
    // textAlign: "center",
    fontFamily: "Poppins_900Black",
    marginBottom: verticalScale(10),
  },
});
