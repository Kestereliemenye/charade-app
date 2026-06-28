import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/Typo";
import { colors } from "../../constants/theme";

const decks = () => {
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.3}>
      <View style={styles.container}>
        <Typo size={30} color={colors.white}>decks</Typo>
      </View>
    </ScreenWrapper>
  );
};

export default decks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
