
import { motion } from "framer-motion";
import { Sparkles, GraduationCap } from "lucide-react";

const wishesVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8
    }
  })
};

const BirthdayWishes = () => {
  const wishes = [
    "Congratulations on completing your post-graduation! A remarkable achievement!",
    "May your hard-earned degree open doors to amazing opportunities!",
    "So proud of your dedication and perseverance in achieving this milestone!",
    "May your knowledge and skills take you to new heights in your career!",
    "Celebrating your graduation and birthday together makes this year extra special!"
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="inline-block mb-4"
        >
          <GraduationCap className="h-12 w-12 text-purple-700 mx-auto" />
        </motion.div>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-script font-bold text-purple-700 mb-8"
        >
          Graduation Wishes
        </motion.h2>
      </motion.div>

      <div className="grid gap-6">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={wishesVariants}
            className={`p-6 rounded-lg shadow-md ${
              index % 2 === 0 
                ? "bg-gradient-to-r from-pink-100 to-purple-100" 
                : "bg-gradient-to-r from-purple-100 to-blue-100"
            }`}
          >
            <p className="text-gray-700 text-lg md:text-xl italic font-script">"{wish}"</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-10 flex justify-center"
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-xl">
          <img 
            src="/lovable-uploads/31fe91e3-8255-4f7c-8853-cc6e760eb64f.png" 
            alt="Graduation photo" 
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/70 to-transparent p-4">
            <p className="text-white text-center font-script text-lg">The proud graduate!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayWishes;
