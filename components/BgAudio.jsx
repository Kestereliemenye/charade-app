import { useContext, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { AudioContext } from "../contexts/AudioContext";

const backgroundMusic = require("../assets/audio/bgMusic.mp3");

const BgAudio = () => {
  const { activeMusicVolume } = useContext(AudioContext);

  const player = useAudioPlayer(backgroundMusic);

  // Start and loop the music
  useEffect(() => {
    player.loop = true;
    player.play();


  }, [player]);

  // Update the volume whenever the context value changes
  useEffect(() => {
    player.volume = activeMusicVolume;
  }, [activeMusicVolume, player]);

  return null;
};

export default BgAudio;
