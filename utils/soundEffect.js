import { createAudioPlayer } from "expo-audio";

const menuSound = require("../assets/audio/menuSound.mp3");

export const playClickSound = (volume = 1) => {
  const player = createAudioPlayer(menuSound);

  // Ensure volume stays between 0 and 1
  player.volume = Math.max(0, Math.min(volume, 1));

  const subscription = player.addListener("playbackStatusUpdate", (status) => {
    if (status.didJustFinish) {
      subscription.remove();
      player.release();
    }
  });

  player.play();
};
