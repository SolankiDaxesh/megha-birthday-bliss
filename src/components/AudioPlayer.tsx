
import { useState, forwardRef, useImperativeHandle } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <Button
        variant="outline"
        size="icon"
        onClick={toggleAudio}
        className={`rounded-full p-3 ${
          isPlaying 
            ? "bg-pink-100 text-pink-600 border-pink-300" 
            : "bg-purple-100 text-purple-600 border-purple-300"
        } hover:bg-opacity-80 transition-colors`}
      >
        {isPlaying ? <Pause size={24} /> : <Music size={24} />}
      </Button>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
