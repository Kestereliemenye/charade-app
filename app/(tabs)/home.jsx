import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import AnimatedButton from "../../components/AnimatedButton";
import Herosection from "../../components/Herosection";
import { spacingX, spacingY } from "../../constants/theme";
import RecentDecks from "../../components/RecentDecks";
import BgAudio from "../../components/BgAudio";

const home = () => {
  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <BgAudio/>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Herosection style={{ marginBottom: 20 }} />
        <AnimatedButton style={{ marginBottom: 30 }} />
        <RecentDecks style={{ marginBottom: 20}} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default home;

const styles = StyleSheet.create({
  scrollContent: {
  paddingHorizontal: spacingX._20
}
});
