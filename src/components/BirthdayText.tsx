
import { motion } from "framer-motion";

const BirthdayText = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 text-center">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3
        }}
      >
        Happy Birthday Megha!
      </motion.h1>
      <motion.p 
        className="text-lg text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Celebrating your special day with beautiful memories from your recent adventures!
      </motion.p>
    </div>
  );
};

export default BirthdayText;
