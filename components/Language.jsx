import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { verticalScale } from "../utils/styling";
import { colors, radius, spacingX } from "../constants/theme";
import Typo from "./Typo";
import * as Icons from "phosphor-react-native";

const Language = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: verticalScale(5),
            //   alignSelf: "flex-start",
          }}
        >
          <Icons.GlobeIcon weight="fill" color={colors.green} />
          <Typo
            size={20}
            color={colors.white}
            style={{ fontFamily: "Poppins_900Black" }}
          >
            LANGUAGE:
          </Typo>
        </View>
        <Typo
          color={colors.white}
          size={15}
          style={{ fontFamily: "Poppins_900Black" }}
        >
          English
        </Typo>
      </View>
    </TouchableOpacity>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    padding: verticalScale(20),
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    borderRadius: radius._20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(30),
    paddingHorizontal: spacingX._30,
  },
});
