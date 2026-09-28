/* eslint-disable react-hooks/immutability */

import { useContext, useEffect, useRef } from "react";
import { useAudioPlayer } from "expo-audio";

import { AudioContext } from "../contexts/AudioContext";

const backgroundMusic = require("../assets/audio/bgMusic.mp3");

const BgAudio = () => {
  const { activeMusicVolume } = useContext(AudioContext);
  const player = useAudioPlayer(backgroundMusic);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    player.loop = true;

    if (!hasStartedRef.current) {
      player.play();
      hasStartedRef.current = true;
    }
  }, [player]);

  useEffect(() => {
    const volume = Number(activeMusicVolume) || 0;

    player.volume = Math.max(0, Math.min(1, volume));
  }, [activeMusicVolume, player]);

  return null;
};

export default BgAudio;
