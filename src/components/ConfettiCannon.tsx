
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const ConfettiCannon = () => {
  const [cannonPosition, setCannonPosition] = useState({ x: 50, y: 80 });
  const [isLoaded, setIsLoaded] = useState(true);

  const fireConfetti = () => {
    if (!isLoaded) return;
    
    setIsLoaded(false);
    
    // Fire confetti from the cannon position
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: cannonPosition.x / 100, y: cannonPosition.y / 100 },
      colors: ['#ff69b4', '#ff1493', '#ba55d3', '#9370db', '#8a2be2'],
      startVelocity: 60,
    });

    // Reload after 2 seconds
    setTimeout(() => setIsLoaded(true), 2000);
  };

  const moveCannon = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCannonPosition({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-script font-bold text-purple-700">
              🎊 Confetti Cannon 🎊
            </h3>
          </div>
          <p className="text-purple-600 text-sm">Click anywhere to position the cannon, then fire!</p>
        </div>

        <div 
          className="relative bg-gradient-to-b from-sky-200 to-green-200 rounded-lg h-80 cursor-crosshair border-4 border-purple-300 overflow-hidden"
          onClick={moveCannon}
        >
          {/* Cannon */}
          <motion.div
            animate={{ x: `${cannonPosition.x}%`, y: `${cannonPosition.y}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-8 h-12 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg shadow-lg">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full"></div>
                {isLoaded && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  ></motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-green-400 to-green-500"></div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={fireConfetti}
            disabled={!isLoaded}
            className={`px-8 py-4 rounded-full text-lg font-medium transition-all ${
              isLoaded 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105" 
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {isLoaded ? "🎊 FIRE! 🎊" : "🔄 Reloading..."}
          </Button>
        </div>

        <p className="text-center text-xs text-purple-600 mt-4">
          🎯 Position your cannon and create the perfect celebration moment! 🎉
        </p>
      </div>
    </div>
  );
};

export default ConfettiCannon;
