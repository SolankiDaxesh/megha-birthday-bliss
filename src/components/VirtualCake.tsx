
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cake, Sparkles } from "lucide-react";

const VirtualCake = () => {
  const [slices, setSlices] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const cutSlice = () => {
    if (slices.length < 8) {
      const newSlice = slices.length + 1;
      setSlices([...slices, newSlice]);
      
      if (slices.length === 7) {
        setIsComplete(true);
      }
    }
  };

  const resetCake = () => {
    setSlices([]);
    setIsComplete(false);
  };

  return (
    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Cake className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-script font-bold text-orange-700">
          🎂 Virtual Cake Cutting 🔪
        </h3>
      </div>

      <div className="relative mx-auto w-48 h-48 mb-6">
        {/* Cake Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full border-4 border-pink-400">
          {/* Cake Layers */}
          <div className="absolute top-2 left-2 right-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full"></div>
          <div className="absolute top-6 left-4 right-4 h-6 bg-gradient-to-b from-white to-pink-100 rounded-full"></div>
          
          {/* Candles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="flex gap-1">
              {[1,2,3].map((candle) => (
                <div key={candle} className="w-1 h-8 bg-yellow-400 rounded-sm relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Cut Slices */}
          <AnimatePresence>
            {slices.map((slice, index) => (
              <motion.div
                key={slice}
                initial={{ rotate: 0, scale: 1 }}
                animate={{ 
                  rotate: index * 45 + 22.5, 
                  x: Math.cos((index * 45 + 22.5) * Math.PI / 180) * 20,
                  y: Math.sin((index * 45 + 22.5) * Math.PI / 180) * 20,
                  scale: 0.9
                }}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos((index * 45) * Math.PI / 180)}% ${50 + 40 * Math.sin((index * 45) * Math.PI / 180)}%, ${50 + 40 * Math.cos((index * 45 + 45) * Math.PI / 180)}% ${50 + 40 * Math.sin((index * 45 + 45) * Math.PI / 180)}%)`
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-pink-200 to-pink-300 rounded-full border-2 border-pink-400"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {!isComplete ? (
        <Button
          onClick={cutSlice}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-red-600"
        >
          🔪 Cut a Slice! ({8 - slices.length} left)
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="text-2xl">🎉 Cake Complete! 🎉</div>
          <p className="text-orange-600">You've shared the birthday cake with everyone!</p>
          <Button
            onClick={resetCake}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full"
          >
            🎂 Make Another Cake
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default VirtualCake;
