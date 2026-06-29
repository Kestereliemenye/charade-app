import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import AnimatedBorderButton from './AnimatedBorderButton';
import { colors, radius, spacingX } from '../constants/theme';
import { router } from 'expo-router';
import { verticalScale } from '../utils/styling';
import * as Icons from "phosphor-react-native";

const AnimatedButton = ({style}) => {
  return (
    <AnimatedBorderButton
      onPress={() => router.push("/(tabs)/home")}
      style={[{
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      }, style]}
    >
      <View style={styles.buttonText}>
        <Icons.PlayIcon
          size={verticalScale(40)}
          weight={"fill"}
          color={colors.white}
        />
        <View>
          <Typo
            size={35}
            fontWeight={"800"}
            color={colors.white}
            style={{
              fontFamily: "Poppins_900Black",
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: 1, height: 2 },
              textShadowRadius: 0.5,
            }}
          >
            Play Now
          </Typo>
          <Typo size={15} fontWeight={700} color={colors.white}>
            Start a quick game
          </Typo>
        </View>
      </View>
    </AnimatedBorderButton>
  );
}

export default AnimatedButton

const styles = StyleSheet.create({
    buttonText: {
        flex:1,
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: verticalScale(40),
        alignItems: "center",
        paddingHorizontal: spacingX._10,
        borderRadius: radius._20
    }
})