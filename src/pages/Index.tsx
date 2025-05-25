
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Confetti from "@/components/Confetti";
import Fireworks from "@/components/Fireworks";
import FloatingParticles from "@/components/FloatingParticles";
import BirthdayText from "@/components/BirthdayText";
import BirthdayMessage from "@/components/BirthdayMessage";
import DubaiMemories from "@/components/DubaiMemories";
import BirthdayWishes from "@/components/BirthdayWishes";
import BirthdayCandles from "@/components/BirthdayCandles";
import Card3D from "@/components/Card3D";
import GuestBook from "@/components/GuestBook";
import CountdownTimer from "@/components/CountdownTimer";
import EnhancedAudioPlayer from "@/components/EnhancedAudioPlayer";
import BirthdayMiniGame from "@/components/BirthdayMiniGame";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Index = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { component: BirthdayText, name: "Greeting" },
    { component: DubaiMemories, name: "Dubai Memories" },
    { component: BirthdayMessage, name: "Birthday Message" },
    { component: BirthdayWishes, name: "Wishes" },
    { 
      component: () => (
        <div className="space-y-8">
          <h2 className="text-3xl font-script font-bold text-purple-700 text-center mb-6">
            🎉 Interactive Birthday Fun! 🎈
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <BirthdayCandles />
              <EnhancedAudioPlayer />
            </div>
            <div>
              <BirthdayMiniGame />
            </div>
          </div>
        </div>
      ), 
      name: "Interactive" 
    },
    { component: GuestBook, name: "Guest Book" },
    { component: CountdownTimer, name: "Countdown" }
  ];

  const openCard = () => {
    setIsCardOpen(true);
    setShowConfetti(true);
    setShowFireworks(true);
    
    // Stop confetti after some time but keep fireworks
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
  };

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      // Small confetti burst on screen change
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const goToScreen = (index: number) => {
    setCurrentScreen(index);
  };

  const CurrentComponent = screens[currentScreen].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {showConfetti && <Confetti />}
      {showFireworks && isCardOpen && <Fireworks />}
      <FloatingParticles />
      
      {!isCardOpen ? (
        <Card3D
          front={
            <motion.div 
              className="text-center px-4 py-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl shadow-xl h-64 flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script font-bold text-purple-700 mb-6 sm:mb-8"
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
              <p className="text-purple-600">Click to flip and open!</p>
            </motion.div>
          }
          back={
            <div className="text-center px-4 py-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl shadow-xl h-64 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-script font-bold text-purple-700 mb-4">
                Ready for the magic? ✨
              </h2>
              <Button 
                onClick={openCard}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-medium hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
              >
                Open Birthday Card
              </Button>
            </div>
          }
          className="w-full max-w-md mx-auto"
        />
      ) : (
        <div className="w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentScreen}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                <CurrentComponent />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-8 gap-4">
            <Button
              variant="outline"
              onClick={prevScreen}
              disabled={currentScreen === 0}
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm hover:bg-white/70 w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft size={16} /> Previous
            </Button>

            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 order-1 sm:order-2">
              {screens.map((screen, index) => (
                <Button
                  key={index}
                  variant={currentScreen === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToScreen(index)}
                  className={`text-xs sm:text-sm px-2 sm:px-3 ${
                    currentScreen === index 
                      ? "bg-pink-500 hover:bg-pink-600" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                >
                  <span className="hidden sm:inline">{screen.name}</span>
                  <span className="sm:hidden">{index + 1}</span>
                </Button>
              ))}
            </div>

            <Button
              variant="default"
              onClick={nextScreen}
              disabled={currentScreen === screens.length - 1}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 w-full sm:w-auto order-3"
            >
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
