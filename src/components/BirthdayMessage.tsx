
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const BirthdayMessage = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <motion.div
        className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-xl shadow-inner text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <Heart className="h-10 w-10 text-pink-500 mx-auto fill-pink-200" />
        </motion.div>
        
        <h2 className="font-script text-3xl md:text-4xl font-bold text-purple-700 mb-6">
          Your Special Day
        </h2>
        
        <p className="text-md md:text-lg text-gray-700 mb-4 leading-relaxed">
          Dear Megha, on your birthday, I want to celebrate the amazing person you are. 
          Your kindness, intelligence, and wonderful spirit brighten the lives of everyone around you.
        </p>
        
        <p className="text-md md:text-lg text-gray-700 mb-6 leading-relaxed">
          May this year bring you all the happiness, success, and beautiful experiences you deserve. 
          Never stop being the incredible person that you are!
        </p>
        
        <div className="text-xl font-script font-bold text-purple-700">
          With love and best wishes!
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;
