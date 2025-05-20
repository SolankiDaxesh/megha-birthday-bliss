
import { motion } from "framer-motion";
import { Cake, Heart, Sparkles } from "lucide-react";

const BirthdayText = () => {
  // Animation variants for text
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const message = "Happy Birthday Megha!";
  const letters = Array.from(message);

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 p-8 text-center rounded-t-lg relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-4 left-10"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Cake className="text-white/80 h-8 w-8" />
      </motion.div>
      
      <motion.div
        className="absolute top-10 right-10"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      >
        <Heart className="text-white/80 h-8 w-8 fill-pink-200" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-2 right-20"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 20, 0]
        }}
        transition={{ 
          duration: 3.2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      >
        <Sparkles className="text-white/80 h-8 w-8" />
      </motion.div>
      
      {/* The main title with letter animation */}
      <div className="flex justify-center items-center space-x-1 md:space-x-2 mb-8 overflow-hidden">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
            className="font-script text-5xl md:text-7xl lg:text-8xl font-bold text-white inline-block"
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
      
      {/* Subtitle with shimmer effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="relative"
      >
        <p className="text-xl md:text-2xl text-white font-medium italic">
          Celebrating your special day with beautiful memories from your adventures!
        </p>
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 2.5,
          }}
        />
      </motion.div>
    </div>
  );
};

export default BirthdayText;
