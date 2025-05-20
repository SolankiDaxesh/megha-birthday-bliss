
import { motion } from "framer-motion";
import { Gift, Heart, Sparkles, Star, Cake } from "lucide-react";

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
    <div className="relative bg-[url('/lovable-uploads/ca617c2b-634d-4615-9ecc-9ab4a037f596.png')] bg-cover bg-center p-10 text-center rounded-t-lg overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-700/80 to-rose-700/80 backdrop-blur-sm"></div>
      
      {/* Animated floating decorations */}
      <div className="absolute inset-0 z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              y: [0, -15, 0],
              scale: [0.8, 1, 0.8],
              rotate: [0, Math.random() > 0.5 ? 180 : -180, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2
            }}
          >
            {i % 4 === 0 && <Star className="text-yellow-300/90 h-6 w-6 fill-yellow-200" />}
            {i % 4 === 1 && <Heart className="text-pink-300/90 h-5 w-5 fill-pink-200" />}
            {i % 4 === 2 && <Sparkles className="text-blue-300/90 h-5 w-5" />}
            {i % 4 === 3 && <Gift className="text-purple-300/90 h-6 w-6 fill-purple-200" />}
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-20 pt-12 pb-8">
        {/* The main title with letter animation */}
        <div className="flex justify-center items-center flex-wrap gap-x-1 md:gap-x-2 mb-10 overflow-hidden">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="font-script text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-white inline-block"
              style={{ textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        
        {/* Birthday cake icon */}
        <motion.div 
          className="mx-auto w-16 h-16 mb-6"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        >
          <Cake className="h-full w-full text-pink-200 drop-shadow-lg" />
        </motion.div>
        
        {/* Subtitle with shimmer effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="relative max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-3xl text-white font-medium italic px-4">
            Celebrating your special day with beautiful memories from your adventures!
          </p>
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
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
    </div>
  );
};

export default BirthdayText;
