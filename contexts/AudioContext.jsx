import React, { createContext, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [effectVolume, setEffectVolume] = useState(0.6);
    const [isMusicMuted, setIsMusicMuted] = useState(false);
    const toggleMute = () => {
      setIsMusicMuted(!isMusicMuted);
    };
    const activeMusicVolume = isMusicMuted ? 0 : musicVolume;
  return (
    <AudioContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
        effectVolume,
        setEffectVolume,
        isMusicMuted,
        setIsMusicMuted,
        toggleMute, // Exported for your MuteButton
        activeMusicVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
