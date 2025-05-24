
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    "May your day be as special as you are!",
    "Wishing you health, wealth, and happiness!",
    "May all your dreams come true!",
    "Here's to another wonderful year!",
    "May this year bring you countless reasons to smile!"
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6 sm:mb-8 md:mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          className="inline-block mb-3 sm:mb-4"
        >
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-500 mx-auto" />
        </motion.div>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script font-bold text-purple-700 mb-6 sm:mb-8"
        >
          Birthday Wishes
        </motion.h2>
      </motion.div>

      <div className="grid gap-4 sm:gap-6">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={wishesVariants}
            className={`p-4 sm:p-5 md:p-6 rounded-lg shadow-md ${
              index % 2 === 0 
                ? "bg-gradient-to-r from-pink-100 to-purple-100" 
                : "bg-gradient-to-r from-purple-100 to-blue-100"
            }`}
          >
            <p className="text-gray-700 text-base sm:text-lg md:text-xl italic font-script text-center px-2">
              "{wish}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayWishes;
