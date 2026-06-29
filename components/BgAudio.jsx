import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AudioContext } from "../contexts/AudioContext";

const BgAudio = () => {
    const { musicVolume, activeMusicVolume } = useContext(AudioContext);
  const [sound, setSound] = useState(null);

    useEffect(() => {
      // 1. Create a local variable to hold the sound stance for the cleanup
      let activeSound = null;
      const playSound = async () => {
        // Load the sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          require("../assets/audio/bgMusic.mp3"),
          { isLooping: true, shouldPlay: true, volume: 0.3 },
        );
        activeSound = newSound; // Assign to local variable
        setSound(newSound);
      };

      playSound();

      // 2. Cleanup using the local variable
    return () => {
      if (activeSound) {
        activeSound.unloadAsync();
      }
    };
  }, []); // Only runs once on mount

    
    useEffect(() => {
      if (sound) {
        sound.setVolumeAsync(activeMusicVolume); // This line is the "magic" that updates live
      }
    }, [activeMusicVolume, sound]); // This useEffect runs every time 'volume' changes


  return null; // This component doesn't need to render anything UI-wise
};

export default BgAudio;
