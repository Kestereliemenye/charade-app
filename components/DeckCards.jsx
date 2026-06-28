import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { verticalScale } from "../utils/styling";
import Typo from "./Typo";
import { colors } from "../constants/theme";

const DeckCards = ({ style, icon: IconComponent, title }) => {
  return (
      <TouchableOpacity>
    <View style={[styles.deck, style]}>
        {/* Render the icon component passed as a prop */}
        {IconComponent && (
          <IconComponent
            size={verticalScale(40)}
            color={"white"}
            weight="fill"
          />
        )}
        <Typo size={20} color={colors.white}>
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
    marginRight: verticalScale(20),
    justifyContent: "center", // Vertically center content
    alignItems: "center",     // Horizontally center content
    borderWidth: 2,
    borderColor: "#FFD700",   // Gold border from your suggested palette
  },
});

