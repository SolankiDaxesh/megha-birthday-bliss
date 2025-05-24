
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const BirthdayMessage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div
        className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-inner text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-pink-500 mx-auto fill-pink-200" />
        </motion.div>
        
        <h2 className="font-script text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-4 sm:mb-6">
          Your Special Day
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed px-2">
          Dear Megha, on your birthday, I want to celebrate the amazing sister you are. 
          Your kindness, intelligence, and wonderful spirit brighten the lives of everyone around you.
        </p>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
          May this year bring you all the happiness, success, and beautiful experiences you deserve. 
          Thank you for being the incredible sister that you are!
        </p>
        
        <div className="text-lg sm:text-xl font-script font-bold text-purple-700">
          With love and best wishes!
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;
