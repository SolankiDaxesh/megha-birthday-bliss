import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const ConfettiCannon = () => {
  const [cannonPosition, setCannonPosition] = useState({ x: 50, y: 75 });
  const [isLoaded, setIsLoaded] = useState(true);

  const fireConfetti = () => {
    if (!isLoaded) return;
    
    setIsLoaded(false);
    
    // Update achievement
    if (typeof window !== 'undefined' && (window as any).updateAchievement) {
      (window as any).updateAchievement('partier');
      (window as any).updateAchievement('gamer');
    }
    
    // Fire confetti from the cannon position
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { x: cannonPosition.x / 100, y: cannonPosition.y / 100 },
      colors: ['#ff69b4', '#ff1493', '#ba55d3', '#9370db', '#8a2be2', '#ffd700', '#ff6347'],
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300,
    });

    // Additional confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { x: cannonPosition.x / 100, y: cannonPosition.y / 100 },
        colors: ['#ff69b4', '#ba55d3', '#ffd700'],
        startVelocity: 35,
      });
    }, 200);

    // Reload after 2 seconds
    setTimeout(() => setIsLoaded(true), 2000);
  };

  const moveCannon = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Keep cannon grounded - limit Y to bottom 30% of area
    const maxY = 85;
    const minY = 70;
    const groundedY = Math.max(minY, Math.min(maxY, y));
    
    setCannonPosition({ 
      x: Math.max(10, Math.min(90, x)), 
      y: groundedY 
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-2xl font-script font-bold text-purple-700 dark:text-purple-300">
              🎊 Confetti Cannon 🎊
            </h3>
          </div>
          <p className="text-purple-600 dark:text-purple-400 text-sm">Click anywhere to position the cannon, then fire!</p>
        </div>

        <div 
          className="relative bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-700 dark:to-green-700 rounded-lg h-80 cursor-crosshair border-4 border-purple-300 dark:border-purple-600 overflow-hidden"
          onClick={moveCannon}
        >
          {/* Ground/Floor - more prominent */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-400 dark:from-green-800 dark:to-green-600 border-t-2 border-green-700 dark:border-green-500">
            {/* Grass texture */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 dark:bg-green-700 opacity-60"></div>
            <div className="absolute top-1 left-0 right-0 h-1 bg-green-400 dark:bg-green-600 opacity-40"></div>
          </div>

          {/* Cannon - properly positioned on ground */}
          <motion.div
            animate={{ 
              x: `${cannonPosition.x}%`, 
              y: `${cannonPosition.y}%`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              {/* Cannon base/wheels */}
              <div className="absolute -bottom-2 -left-2 -right-2 flex justify-center gap-1">
                <div className="w-3 h-3 bg-gray-800 dark:bg-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 dark:bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Main cannon body */}
              <div className="w-8 h-12 bg-gradient-to-b from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-lg shadow-lg relative">
                {/* Cannon barrel */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-10 bg-gradient-to-b from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 rounded-full shadow-md"></div>
                
                {/* Cannon decoration */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-400 dark:bg-gray-300 rounded-full"></div>
                
                {/* Load indicator */}
                {isLoaded && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Sky decorations */}
          <div className="absolute top-4 left-4 text-2xl animate-pulse">☁️</div>
          <div className="absolute top-8 right-8 text-2xl animate-pulse">☁️</div>
          <div className="absolute top-12 left-1/2 text-xl animate-bounce">☀️</div>
          
          {/* Hills in background */}
          <div className="absolute bottom-16 left-0 w-32 h-16 bg-green-300 dark:bg-green-600 rounded-full opacity-60"></div>
          <div className="absolute bottom-16 right-0 w-40 h-20 bg-green-300 dark:bg-green-600 rounded-full opacity-60"></div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={fireConfetti}
            disabled={!isLoaded}
            className={`px-8 py-4 rounded-full text-lg font-medium transition-all transform ${
              isLoaded 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg" 
                : "bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed scale-95"
            }`}
          >
            {isLoaded ? "🎊 FIRE! 🎊" : "🔄 Reloading..."}
          </Button>
        </div>

        <p className="text-center text-xs text-purple-600 dark:text-purple-400 mt-4">
          🎯 Position your cannon on the ground and create the perfect celebration moment! 🎉
        </p>
      </div>
    </div>
  );
};

export default ConfettiCannon;
