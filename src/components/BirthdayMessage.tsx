
import { motion } from "framer-motion";
import { Heart, GraduationCap, Gift, Medal } from "lucide-react";

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
          className="mb-6 flex justify-center gap-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <Heart className="h-10 w-10 text-pink-500 mx-auto fill-pink-200" />
          <Gift className="h-10 w-10 text-purple-700 mx-auto" />
          <Medal className="h-10 w-10 text-amber-500 mx-auto" />
        </motion.div>
        
        <h2 className="font-script text-3xl md:text-4xl font-bold text-purple-700 mb-6">
          Your Special Day
        </h2>
        
        <p className="text-md md:text-lg text-gray-700 mb-4 leading-relaxed">
          Dear Megha, on your birthday, I'm celebrating you and all the wonderful things about you! This special day is all about your amazing journey through life.
        </p>
        
        <motion.div
          className="bg-white/50 p-4 rounded-lg mb-4 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GraduationCap className="h-8 w-8 text-purple-700 flex-shrink-0" />
          <p className="text-md text-gray-700 leading-relaxed text-left">
            Among your many achievements this year, completing your post-graduation stands out! So proud of your hard work and determination.
          </p>
        </motion.div>
        
        <p className="text-md md:text-lg text-gray-700 mb-6 leading-relaxed">
          As your sibling, I couldn't be more proud of everything you've accomplished. Here's to celebrating you on your birthday!
        </p>
        
        <div className="text-xl font-script font-bold text-purple-700">
          With love and best wishes!
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;
