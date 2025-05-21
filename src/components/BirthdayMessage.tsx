
import { motion } from "framer-motion";
import { Heart, GraduationCap } from "lucide-react";

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
          <GraduationCap className="h-10 w-10 text-purple-700 mx-auto" />
        </motion.div>
        
        <h2 className="font-script text-3xl md:text-4xl font-bold text-purple-700 mb-6">
          Your Special Year
        </h2>
        
        <p className="text-md md:text-lg text-gray-700 mb-4 leading-relaxed">
          Dear Megha, on your birthday, I'm not just celebrating another year of your amazing life, but also your incredible achievement of completing your post-graduation!
        </p>
        
        <p className="text-md md:text-lg text-gray-700 mb-6 leading-relaxed">
          Your dedication, intelligence, and perseverance have led you to this academic success. As your sibling, I couldn't be more proud of everything you've accomplished. Here's to celebrating both your birthday and your graduation!
        </p>
        
        <div className="text-xl font-script font-bold text-purple-700">
          With love, pride, and best wishes!
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayMessage;
