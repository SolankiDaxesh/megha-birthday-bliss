
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";

const EnhancedAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const songs = [
    { title: "Happy Birthday Song", src: "/birthday-song.mp3" },
    // You can add more songs here
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => console.error("Audio playback failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    audio.volume = newVolume;
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsMuted(!isMuted);
    audio.muted = !isMuted;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 shadow-lg max-w-md mx-auto"
    >
      <audio
        ref={audioRef}
        src={songs[currentSong].src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="text-center mb-4">
        <h4 className="font-semibold text-purple-700 mb-1">🎵 Now Playing</h4>
        <p className="text-sm text-gray-600">{songs[currentSong].title}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
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
          variant="outline"
          size="icon"
          className="rounded-full"
          disabled={songs.length <= 1}
        >
          <SkipBack size={18} />
        </Button>

        <Button
          onClick={togglePlay}
          size="icon"
          className="rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          disabled={songs.length <= 1}
        >
          <SkipForward size={18} />
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
          🎂 Birthday tunes to make your day special! 🎂
        </p>
      </div>
    </motion.div>
  );
};

export default EnhancedAudioPlayer;
