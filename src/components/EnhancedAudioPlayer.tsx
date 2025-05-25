
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const EnhancedAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(30); // 30 seconds
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createBeautifulBirthdayMelody = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      // Complete Happy Birthday melody with harmonies and variations
      const melody = [
        // First verse: "Happy Birthday to you"
        { note: 261.63, duration: 0.75, harmony: [329.63] }, // C + E
        { note: 261.63, duration: 0.25, harmony: [329.63] }, // C + E
        { note: 293.66, duration: 1, harmony: [369.99] },    // D + F#
        { note: 261.63, duration: 1, harmony: [329.63] },    // C + E
        { note: 349.23, duration: 1, harmony: [440.00] },    // F + A
        { note: 329.63, duration: 2, harmony: [415.30] },    // E + G#
        
        // Second verse: "Happy Birthday to you"
        { note: 261.63, duration: 0.75, harmony: [329.63] }, // C + E
        { note: 261.63, duration: 0.25, harmony: [329.63] }, // C + E
        { note: 293.66, duration: 1, harmony: [369.99] },    // D + F#
        { note: 261.63, duration: 1, harmony: [329.63] },    // C + E
        { note: 392.00, duration: 1, harmony: [493.88] },    // G + B
        { note: 349.23, duration: 2, harmony: [440.00] },    // F + A
        
        // Third verse: "Happy Birthday dear [name]"
        { note: 261.63, duration: 0.75, harmony: [523.25] }, // C + C (octave)
        { note: 261.63, duration: 0.25, harmony: [523.25] }, // C + C (octave)
        { note: 523.25, duration: 1, harmony: [659.25] },    // C + E (high)
        { note: 440.00, duration: 1, harmony: [554.37] },    // A + C#
        { note: 349.23, duration: 1, harmony: [440.00] },    // F + A
        { note: 329.63, duration: 1, harmony: [415.30] },    // E + G#
        { note: 293.66, duration: 1, harmony: [369.99] },    // D + F#
        
        // Fourth verse: "Happy Birthday to you"
        { note: 466.16, duration: 0.75, harmony: [587.33] }, // Bb + D
        { note: 466.16, duration: 0.25, harmony: [587.33] }, // Bb + D
        { note: 440.00, duration: 1, harmony: [554.37] },    // A + C#
        { note: 349.23, duration: 1, harmony: [440.00] },    // F + A
        { note: 392.00, duration: 1, harmony: [493.88] },    // G + B
        { note: 349.23, duration: 3, harmony: [440.00] },    // F + A (extended)
      ];
      
      let currentTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.connect(audioContext.destination);
      masterGain.gain.setValueAtTime(volume * 0.4, currentTime);
      
      melody.forEach(({ note, duration, harmony }, index) => {
        // Main melody oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);
        
        oscillator.frequency.setValueAtTime(note, currentTime);
        oscillator.type = 'sine';
        
        // Smooth attack and release
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.6, currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration - 0.1);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        
        // Add harmony notes
        harmony.forEach((harmonyNote, harmonyIndex) => {
          const harmonyOsc = audioContext.createOscillator();
          const harmonyGain = audioContext.createGain();
          
          harmonyOsc.connect(harmonyGain);
          harmonyGain.connect(masterGain);
          
          harmonyOsc.frequency.setValueAtTime(harmonyNote, currentTime);
          harmonyOsc.type = 'triangle';
          
          harmonyGain.gain.setValueAtTime(0, currentTime);
          harmonyGain.gain.linearRampToValueAtTime(0.3, currentTime + 0.15);
          harmonyGain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration - 0.1);
          
          harmonyOsc.start(currentTime + 0.05);
          harmonyOsc.stop(currentTime + duration);
        });
        
        // Add subtle reverb effect with delay
        if (index % 4 === 0) {
          const delayNode = audioContext.createDelay();
          const delayGain = audioContext.createGain();
          
          delayNode.delayTime.setValueAtTime(0.2, currentTime);
          delayGain.gain.setValueAtTime(0.2, currentTime);
          
          const echoOsc = audioContext.createOscillator();
          const echoGainNode = audioContext.createGain();
          
          echoOsc.connect(echoGainNode);
          echoGainNode.connect(delayNode);
          delayNode.connect(delayGain);
          delayGain.connect(masterGain);
          
          echoOsc.frequency.setValueAtTime(note, currentTime);
          echoOsc.type = 'sawtooth';
          
          echoGainNode.gain.setValueAtTime(0, currentTime);
          echoGainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
          echoGainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
          
          echoOsc.start(currentTime);
          echoOsc.stop(currentTime + duration);
        }
        
        currentTime += duration;
      });
      
      return currentTime - audioContext.currentTime;
    } catch (error) {
      console.log("Web Audio API not supported");
      return 0;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      const totalDuration = createBeautifulBirthdayMelody();
      setIsPlaying(true);
      
      // Update progress every 100ms
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          if (newTime >= duration) {
            setIsPlaying(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return newTime;
        });
      }, 100);
      
      // Auto stop after 30 seconds
      setTimeout(() => {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setCurrentTime(0);
      }, 30000);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioContextRef.current && isPlaying) {
      // Volume changes will apply to new notes as they play
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 shadow-lg max-w-md mx-auto"
    >
      <div className="text-center mb-4">
        <h4 className="font-semibold text-purple-700 mb-1">🎵 Beautiful Birthday Melody</h4>
        <p className="text-sm text-gray-600">Web Audio API Generated Music</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <Button
          onClick={togglePlay}
          size="icon"
          className="rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
      </div>

      {/* Volume control */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="h-8 w-8"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>
        
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #ec4899 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          🎂 A beautiful melody crafted just for you! 🎂
        </p>
      </div>
    </motion.div>
  );
};

export default EnhancedAudioPlayer;
