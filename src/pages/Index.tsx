
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Confetti from "@/components/Confetti";
import BirthdayText from "@/components/BirthdayText";
import BirthdayMessage from "@/components/BirthdayMessage";
import DubaiMemories from "@/components/DubaiMemories";
import BirthdayWishes from "@/components/BirthdayWishes";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";

const Index = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { component: BirthdayText, name: "Greeting" },
    { component: DubaiMemories, name: "Dubai Memories" },
    { component: BirthdayMessage, name: "Message" },
    { component: BirthdayWishes, name: "Graduation" }
  ];

  const openCard = () => {
    setIsCardOpen(true);
    setShowConfetti(true);
    
    // Stop confetti after some time
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {!isCardOpen ? (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="mb-6 flex justify-center">
            <GraduationCap className="h-16 w-16 text-purple-700" />
          </motion.div>
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
            Birthday & Graduation Celebration!
          </motion.h1>
          <Button 
            onClick={openCard}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-full text-xl font-medium hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-pink-200/50 transition-all duration-300"
          >
            Open Celebration Card
          </Button>
        </motion.div>
      ) : (
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentScreen}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 md:p-8">
                <CurrentComponent />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevScreen}
              disabled={currentScreen === 0}
              className="flex items-center gap-2 bg-white/50 backdrop-blur-sm hover:bg-white/70"
            >
              <ArrowLeft size={16} /> Previous
            </Button>

            <div className="flex gap-2">
              {screens.map((screen, index) => (
                <Button
                  key={index}
                  variant={currentScreen === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToScreen(index)}
                  className={currentScreen === index 
                    ? "bg-pink-500 hover:bg-pink-600" 
                    : "bg-white/50 hover:bg-white/70"}
                >
                  {screen.name}
                </Button>
              ))}
            </div>

            <Button
              variant="default"
              onClick={nextScreen}
              disabled={currentScreen === screens.length - 1}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600"
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
