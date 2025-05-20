
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import PhotoGallery from "@/components/PhotoGallery";
import Confetti from "@/components/Confetti";
import AudioPlayer from "@/components/AudioPlayer";
import BirthdayText from "@/components/BirthdayText";
import { motion } from "framer-motion";

const Index = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isCardOpen) {
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
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, [isCardOpen]);

  const openCard = () => {
    setIsCardOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {!isCardOpen ? (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
            There's a special message for you!
          </h1>
          <Button 
            onClick={openCard}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-6 rounded-full text-xl hover:from-pink-600 hover:to-purple-600 shadow-lg"
          >
            Open Birthday Card
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <BirthdayText />
            <div className="p-6">
              <PhotoGallery />
              <div className="flex justify-center mt-6">
                <AudioPlayer ref={audioRef} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
