import { Audio } from "expo-av";

// We now accept 'volume' as an argument
export const playClickSound = async (volume) => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/audio/menuSound.mp3"),
  );

  // Set the specific effect volume
  await sound.setVolumeAsync(volume);
  await sound.playAsync();

  // Unload after playing to free memory
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      sound.unloadAsync();
    }
  });
};
