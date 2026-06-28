import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { colors, spacingX } from "../constants/theme";
import DeckCards from "./DeckCards";
import { verticalScale } from "../utils/styling";
import * as Icons from "phosphor-react-native";

const RecentDecks = ({ style }) => {
  const DECK_DATA = [
    { id: "1", title: "Nollywood", icon: Icons.FilmSlate },
    { id: "2", title: "Afrobeats", icon: Icons.MusicNotes },
    { id: "3", title: "Lagos Life", icon: Icons.Buildings },
    { id: "4", title: "Street Food", icon: Icons.Hamburger },
    { id: "5", title: "Pidgin", icon: Icons.ChatCircleText },
    { id: "6", title: "Football", icon: Icons.SoccerBall },
    { id: "7", title: "Market", icon: Icons.ShoppingBag },
    { id: "8", title: "Party", icon: Icons.Confetti },
    { id: "9", title: "Tech", icon: Icons.Desktop },
    { id: "10", title: "Classic", icon: Icons.MaskHappy },
  ];
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
        da
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacingX._10 }}
      >
        {DECK_DATA.map((item) => (
          <DeckCards key={item.id} title={item.title} icon={item.icon} />
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
