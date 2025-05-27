
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const BalloonPop = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#fd79a8'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let balloonSpawner: NodeJS.Timeout;
    if (gameActive) {
      balloonSpawner = setInterval(() => {
        const newBalloon: Balloon = {
          id: Date.now() + Math.random(),
          x: Math.random() * 75 + 12.5, // Better positioning
          y: Math.random() * 60 + 20,
          color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
          size: Math.random() * 20 + 40 // Larger balloons for easier clicking
        };
        setBalloons(prev => {
          const newBalloons = [...prev, newBalloon];
          return newBalloons.slice(-5); // Keep max 5 balloons
        });
      }, 1000); // Spawn every second
    }
    return () => {
      if (balloonSpawner) clearInterval(balloonSpawner);
    };
  }, [gameActive]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setBalloons([]);
    
    // Update achievement
    if (typeof window !== 'undefined' && (window as any).updateAchievement) {
      (window as any).updateAchievement('gamer');
    }
  };

  const popBalloon = (balloonId: number) => {
    setBalloons(prev => prev.filter(balloon => balloon.id !== balloonId));
    setScore(prev => prev + 10);
    
    // Update achievement
    if (typeof window !== 'undefined' && (window as any).updateAchievement) {
      (window as any).updateAchievement('gamemaster');
    }
  };

  const resetGame = () => {
    setTimeLeft(30);
    setScore(0);
    setBalloons([]);
    setGameActive(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-script font-bold text-purple-700 dark:text-purple-300 mb-4">
            🎈 Balloon Pop Game 🎈
          </h3>
          <p className="text-purple-600 dark:text-purple-400 text-sm">Pop the balloons as fast as you can!</p>
        </div>

        {!gameActive && timeLeft === 30 ? (
          <div className="text-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
            >
              🎈 Start Popping! 🎈
            </Button>
          </div>
        ) : gameActive ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-purple-200 dark:border-purple-600">
                <span className="text-purple-700 dark:text-purple-300 font-bold">Score: {score} 🌟</span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm border border-purple-200 dark:border-purple-600">
                <span className="text-purple-700 dark:text-purple-300 font-bold">Time: {timeLeft}s ⏰</span>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-700 dark:to-sky-800 rounded-lg h-80 overflow-hidden border-4 border-purple-300 dark:border-purple-600">
              <AnimatePresence>
                {balloons.map((balloon) => (
                  <motion.button
                    key={balloon.id}
                    initial={{ scale: 0, y: 50 }}
                    animate={{ 
                      scale: 1, 
                      y: [0, -15, 0],
                    }}
                    exit={{ scale: 0, opacity: 0, y: -50 }}
                    transition={{ 
                      scale: { duration: 0.3 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={() => popBalloon(balloon.id)}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full"
                    style={{
                      left: `${balloon.x}%`,
                      top: `${balloon.y}%`,
                      width: `${balloon.size}px`,
                      height: `${balloon.size * 1.3}px`,
                      backgroundColor: balloon.color,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      border: '3px solid rgba(255,255,255,0.4)',
                      boxShadow: 'inset 10px 10px 15px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    aria-label={`Pop balloon`}
                  >
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-600"
                      style={{ marginTop: '-2px' }}
                    ></div>
                  </motion.button>
                ))}
              </AnimatePresence>
              
              {/* Background decorations */}
              <div className="absolute top-4 left-4 text-xl opacity-50">☁️</div>
              <div className="absolute top-8 right-8 text-xl opacity-50">☁️</div>
              <div className="absolute bottom-4 left-8 text-lg opacity-30">🌱</div>
              <div className="absolute bottom-4 right-12 text-lg opacity-30">🌸</div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 rounded-lg p-6 mb-4 border border-purple-200 dark:border-purple-600">
              <h4 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">🎉 Game Over! 🎉</h4>
              <p className="text-lg text-purple-600 dark:text-purple-400 mb-2">
                Final Score: <span className="font-bold text-2xl text-yellow-600">{score}</span> 🎈
              </p>
              <p className="text-sm text-purple-500 dark:text-purple-400">
                {score >= 100 ? "Amazing! 🏆" : score >= 50 ? "Great job! 🎯" : "Keep practicing! 💪"}
              </p>
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
            >
              🎈 Play Again 🎈
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BalloonPop;
