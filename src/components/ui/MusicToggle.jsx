import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    // Add piano music file to public/piano-music.mp3
    audioRef.current = new Audio("/piano-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Soft background volume
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });
    audioRef.current.addEventListener("error", () => {
      console.warn(
        "Background music file not found. Add music to public folder."
      );
      setIsLoaded(false);
    });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
      setIsPlaying(true);
    }
  };

  // Don't show if audio file isn't loaded
  if (!isLoaded) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-wedding-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-wedding-gold transition-colors duration-300"
      title={isPlaying ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicToggle;
