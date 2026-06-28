import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AudioContext } from "../contexts/AudioContext";

const BgAudio = () => {
    const { musicVolume } = useContext(AudioContext);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const playSound = async () => {
      // Load the sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/audio/bgMusic.mp3"),
        { isLooping: true, shouldPlay: true, volume: 0.3 },
      );
      setSound(newSound);
    };

    playSound();

    // Cleanup when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
    
    useEffect(() => {
      if (sound) {
        sound.setVolumeAsync(musicVolume); // This line is the "magic" that updates live
      }
    }, [musicVolume, sound]); // This useEffect runs every time 'volume' changes


  return null; // This component doesn't need to render anything UI-wise
};

export default BgAudio;
