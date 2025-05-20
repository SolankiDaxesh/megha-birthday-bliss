
import { useState, forwardRef, useImperativeHandle } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AudioPlayer = forwardRef<HTMLAudioElement | null, {}>(
  (props, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio("/birthday-song.mp3"));

    useImperativeHandle(ref, () => audio);

    const toggleAudio = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => console.error("Audio playback failed:", error));
      }
      setIsPlaying(!isPlaying);
    };

    // Handle audio events
    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAudio}
          className={`rounded-full p-4 h-14 w-14 ${
            isPlaying 
              ? "bg-purple-100 text-purple-700 border-purple-300" 
              : "bg-pink-100 text-pink-700 border-pink-300"
          } hover:bg-opacity-80 transition-colors shadow-md`}
        >
          {isPlaying ? (
            <Pause size={24} className="animate-pulse" />
          ) : (
            <Music size={24} />
          )}
        </Button>
      </motion.div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
