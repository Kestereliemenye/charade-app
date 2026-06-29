import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { verticalScale } from "../utils/styling";
import { colors, radius, spacingX } from "../constants/theme";
import Typo from "./Typo";
import * as Icons from "phosphor-react-native";

const Credits = () => {
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
          <Icons.StarIcon weight="fill" color={colors.green} />
          <Typo
            size={20}
            color={colors.white}
            style={{ fontFamily: "Poppins_900Black" }}
          >
            Credits:
          </Typo>
        </View>
        <Icons.CaretRightIcon weight="fill" color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};

export default Credits;

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
