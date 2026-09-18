import {
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "@/constants/theme";


const ScreenWrapper = ({
  style,
  children,
  showPattern = false,
  showOverlay = false,
  overlayColor = colors.neutral900,
  overlayOpacity = 0.6,
  isModal = false,
  bgOpacity = 1,
  bgImage = require("../assets/images/screenWrapper-img.png"),
}) => {

    const { height } = useWindowDimensions();

  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
  let paddingBottom = 0;

  if (isModal) {
    paddingTop = Platform.OS === "ios" ? height * 0.02 : 45;
    paddingBottom = height * 0.02;
  }

  return (
    <ImageBackground
      style={[
        styles.background,
        {
          backgroundColor: isModal ? colors.white : colors.spalshBg,
        },
      ]}
      imageStyle={{
        opacity: showPattern ? bgOpacity : 0,
      }}
      source={bgImage}
    >
      {showOverlay && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            },
          ]}
        />
      )}

      <View
        style={[
          styles.content,
          {
            paddingTop,
            paddingBottom,
          },
          style,
        ]}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});
