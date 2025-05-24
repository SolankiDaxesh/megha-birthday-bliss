
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AudioPlayer = forwardRef<HTMLAudioElement | null, {}>(
  (props, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(() => {
      const audioElement = new Audio();
      // Use a free online birthday song or create a simple audio tone
      audioElement.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LDdCUGLoHM8tiJOQcZZ7zq559NEAxPpuPwtmQcBjiS2/LDdSUFLIDM8tiJOQcYZ7rq559NEAxOpuPxt2MbBjiR2vLDdCUGLIDM8tiJOQgYZ7rq555NEAwOpuDhugIA";
      return audioElement;
    });

    useImperativeHandle(ref, () => audio);

    useEffect(() => {
      const handleEnded = () => setIsPlaying(false);
      const handlePause = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handleError = () => {
        console.log("Audio error, creating fallback tone");
        createAudioTone();
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('error', handleError);
      };
    }, [audio]);

    const createAudioTone = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5 note
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        oscillator.start();
        
        // Play a happy birthday melody
        const notes = [523.25, 523.25, 587.33, 523.25, 698.46, 659.25]; // C C D C F E
        notes.forEach((freq, index) => {
          setTimeout(() => {
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          }, index * 400);
        });
        
        setTimeout(() => {
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.stop(audioContext.currentTime + 0.1);
        }, notes.length * 400);
        
      } catch (error) {
        console.log("Web Audio API not supported");
      }
    };

    const toggleAudio = () => {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.log("Audio playback failed, using fallback tone");
          createAudioTone();
          setIsPlaying(true);
          setTimeout(() => setIsPlaying(false), 2400); // Duration of melody
        });
      }
    };

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
