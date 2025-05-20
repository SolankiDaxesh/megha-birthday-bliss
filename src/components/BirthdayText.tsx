
import { motion } from "framer-motion";
import { Gift, PartyPopper, Cake, Sparkles } from "lucide-react";

const BirthdayText = () => {
  return (
    <div className="relative py-16 px-6 overflow-hidden text-center rounded-t-lg">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Sparkle overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMC41IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] opacity-40" />
      
      {/* Content with z-index to be above backgrounds */}
      <div className="relative z-10">
        {/* Birthday cake icon */}
        <motion.div
          className="mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
        >
          <Cake className="h-20 w-20 text-white drop-shadow-glow" />
        </motion.div>
        
        {/* Main heading with staggered letter animation */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-script font-bold text-white mb-8 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Happy Birthday Megha!
        </motion.h1>
        
        {/* Decorative icons */}
        <div className="flex justify-center gap-8 mb-6">
          {[Gift, PartyPopper, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
            >
              <Icon className="h-8 w-8 text-white/90" />
            </motion.div>
          ))}
        </div>
        
        {/* Subtitle with shimmer effect */}
        <motion.div 
          className="relative max-w-2xl mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-white font-medium italic pb-1">
            Wishing you a day filled with joy and wonderful moments!
          </p>
          <motion.div
            className="h-0.5 w-40 mx-auto bg-white/50 mt-4 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ delay: 2, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BirthdayText;
