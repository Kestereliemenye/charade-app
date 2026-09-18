import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import Typo from "./Typo";
import { colors, radius, spacingX } from "../constants/theme";
import { verticalScale } from "../utils/styling";

const DeckCards = ({ id, style, image, title }) => {
  const handlePress = () => {
    router.push({
      pathname: "/Lobby",
      params: { deckTitle: title },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={[styles.deck, style]}>
        <Image source={image} style={styles.deckImage} contentFit="contain" />

        <Typo
          size={17}
          color={colors.white}
          fontWeight="700"
          style={styles.title}
        >
          {title}
        </Typo>
      </View>
    </TouchableOpacity>
  );
};

export default DeckCards;

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },

  deck: {
    width: "100%",
    height: verticalScale(150),
    paddingHorizontal: spacingX._10,
    // paddingTop: 8,
    // paddingBottom: 10,
    borderWidth: verticalScale(2),
    borderColor: "#FFBE0B",
    borderRadius: radius._15,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "rgba(0, 145, 80, 0.88)",
  },

  imageContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  deckImage: {
    width: "100%",
    height: "100%",
  },

  titleContainer: {
    minHeight: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    lineHeight: 20,
  },
});
