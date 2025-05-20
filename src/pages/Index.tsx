
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Confetti from "@/components/Confetti";
import AudioPlayer from "@/components/AudioPlayer";
import BirthdayText from "@/components/BirthdayText";
import BirthdayMessage from "@/components/BirthdayMessage";
import { motion } from "framer-motion";

const Index = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openCard = () => {
    setIsCardOpen(true);
    setShowConfetti(true);
    
    // Start playing audio when card is opened
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        toast({
          title: "Audio couldn't play automatically",
          description: "Please click the music button to hear the birthday tune!",
          duration: 5000,
        });
      });
    }
    
    // Stop confetti after some time
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {!isCardOpen ? (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-script font-bold text-purple-700 mb-8"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            A Birthday Surprise!
          </motion.h1>
          <Button 
            onClick={openCard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-full text-xl font-medium hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
          >
            Open Birthday Card
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <BirthdayText />
            <BirthdayMessage />
            <div className="flex justify-center py-6 bg-gradient-to-r from-purple-50 to-pink-50">
              <AudioPlayer ref={audioRef} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
