
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind } from "lucide-react";

const BirthdayCandles = () => {
  const [litCandles, setLitCandles] = useState([true, true, true, true, true]);
  const [blowingWind, setBlowingWind] = useState(false);

  const blowOutCandle = (index: number) => {
    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);
    
    // Re-light after 3 seconds
    setTimeout(() => {
      const relitCandles = [...newCandles];
      relitCandles[index] = true;
      setLitCandles(relitCandles);
    }, 3000);
  };

  const blowOutAllCandles = () => {
    setBlowingWind(true);
    setLitCandles([false, false, false, false, false]);
    
    setTimeout(() => {
      setBlowingWind(false);
      setLitCandles([true, true, true, true, true]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      <motion.div
        className="flex gap-3 sm:gap-4"
        animate={blowingWind ? { x: [-2, 2, -2, 0] } : {}}
        transition={{ duration: 0.5, repeat: blowingWind ? 3 : 0 }}
      >
        {litCandles.map((isLit, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => blowOutCandle(index)}
          >
            {/* Candle body */}
            <div className="w-3 sm:w-4 h-12 sm:h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-sm shadow-md"></div>
            
            {/* Flame */}
            <AnimatePresence>
              {isLit && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -2, 0]
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    y: { duration: 0.8, repeat: Infinity },
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <div className="w-2 h-3 bg-gradient-to-t from-orange-400 via-yellow-400 to-red-400 rounded-full shadow-lg"></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Smoke when blown out */}
            <AnimatePresence>
              {!isLit && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs"
                >
                  💨
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
      
      <motion.button
        onClick={blowOutAllCandles}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-700 text-sm font-medium transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Wind size={16} />
        Blow out candles
      </motion.button>
      
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        Click individual candles or blow them all out!
      </p>
    </div>
  );
};

export default BirthdayCandles;
