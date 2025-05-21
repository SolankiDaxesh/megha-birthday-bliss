
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
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, type: "spring" }}
          className="inline-block mb-4"
        >
          <Sparkles className="h-12 w-12 text-yellow-500 mx-auto" />
        </motion.div>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-script font-bold text-purple-700 mb-8"
        >
          Birthday Wishes
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
    </div>
  );
};

export default BirthdayWishes;
