import React, { createContext, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [effectVolume, setEffectVolume] = useState(0.6);
  return (
    <AudioContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
        effectVolume,
        setEffectVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
