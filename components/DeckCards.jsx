import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { verticalScale } from "../utils/styling";
import Typo from "./Typo";
import { colors } from "../constants/theme";

const DeckCards = ({ style, icon: IconComponent, title }) => {
  const handlePress = () => {
    // Navigate to the 'Lobby' route and pass the title as a parameter
    router.push({
      pathname: "/Lobby",
      params: { deckTitle: title },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.deck, style]}>
        {/* Render the icon component passed as a prop */}
        {IconComponent && (
          <IconComponent
            size={verticalScale(40)}
            color={"white"}
            weight="fill"
          />
        )}
        <Typo size={20} style={{ textAlign: "center" }} color={colors.white}>
          {title}
        </Typo>
      </View>
    </TouchableOpacity>
  );
};

export default DeckCards;

const styles = StyleSheet.create({
  deck: {
    width: verticalScale(130),
    height: verticalScale(130),
    backgroundColor: "#1B3022", // A deep green to match your theme
    borderRadius: 20,
    // marginRight: verticalScale(20),
    justifyContent: "center", // Vertically center content
    alignItems: "center",
    // Horizontally center content

    borderWidth: 2,
    borderColor: "#FFD700",   // Gold border from your suggested palette
  },
});

