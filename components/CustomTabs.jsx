import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
  ZoomIn,
} from "react-native-reanimated";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Icons from "phosphor-react-native";

import { colors } from "@/constants/theme";
import { AudioContext } from "../contexts/AudioContext";
import { playClickSound } from "../utils/soundEffect";

export default function CustomTabs({ state, descriptors, navigation }) {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const insets = useSafeAreaInsets();
  const { effectVolume } = useContext(AudioContext);

  const tabbarItems = {
    home: {
      label: "Home",
      icon: Icons.House,
    },

    decks: {
      label: "Decks",
      icon: Icons.Cards,
    },

    settings: {
      label: "Settings",
      icon: Icons.Gear,
    },
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          bottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const tabItem = tabbarItems[route.name];

        if (!tabItem) {
          return null;
        }

        const IconComponent = tabItem.icon;

        const onPress = () => {
          playClickSound(effectVolume);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <AnimatedTouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            activeOpacity={0.8}
            onPress={onPress}
            onLongPress={onLongPress}
            layout={LinearTransition.springify().damping(18).stiffness(180)}
            style={[styles.tabItem, isFocused && styles.activeTabItem]}
          >
            <Animated.View
              key={`${route.key}-${isFocused}`}
              entering={ZoomIn.duration(180)}
            >
              <IconComponent
                size={isFocused ? 25 : 27}
                weight={isFocused ? "fill" : "regular"}
                color={isFocused ? "#063D24" : "rgba(255,255,255,0.65)"}
              />
            </Animated.View>

            {isFocused && (
              <Animated.Text
                entering={FadeInRight.duration(220)}
                exiting={FadeOutLeft.duration(150)}
                style={styles.activeLabel}
              >
                {tabItem.label}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    height: 72,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#061D13",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    elevation: 15,
  },

  tabItem: {
    minWidth: 58,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  activeTabItem: {
    minWidth: 110,
    gap: 8,
    backgroundColor: "#FFBE0B",
  },

  activeLabel: {
    color: "#063D24",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
});
