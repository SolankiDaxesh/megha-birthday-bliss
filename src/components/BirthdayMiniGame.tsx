
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Star, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const BirthdayMiniGame = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gifts, setGifts] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);
  const [gameOver, setGameOver] = useState(false);

  const giftEmojis = ['🎁', '🎂', '🍰', '🎈', '🎊', '🌟', '💎', '🎀'];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
      setGameOver(true);
    }
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    let giftSpawner: NodeJS.Timeout;
    if (gameStarted) {
      giftSpawner = setInterval(() => {
        const newGift = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10, // 10% to 90% of width
          y: Math.random() * 60 + 20, // 20% to 80% of height
          emoji: giftEmojis[Math.floor(Math.random() * giftEmojis.length)]
        };
        setGifts(prev => [...prev, newGift]);
      }, 1500);
    }
    return () => clearInterval(giftSpawner);
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGifts([]);
    setGameOver(false);
  };

  const catchGift = (giftId: number) => {
    setGifts(prev => prev.filter(gift => gift.id !== giftId));
    setScore(prev => prev + 10);
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setGifts([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-lg"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-script font-bold text-purple-700">
              🎮 Birthday Gift Catcher 🎁
            </h3>
            <Sparkles className="h-6 w-6 text-pink-500" />
          </div>
          <p className="text-purple-600 text-sm">
            Catch the falling birthday gifts to score points! 🎯✨
          </p>
        </div>

        {!gameStarted && !gameOver && (
          <div className="text-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-purple-700 hover:to-pink-700 shadow-lg"
            >
              🎉 Start Game 🎉
            </Button>
          </div>
        )}

        {gameStarted && (
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-purple-700 font-bold">Score: {score} 🌟</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <span className="text-purple-700 font-bold">Time: {timeLeft}s ⏰</span>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-b from-blue-200 to-blue-100 rounded-lg h-80 overflow-hidden border-4 border-purple-300">
              <AnimatePresence>
                {gifts.map((gift) => (
                  <motion.button
                    key={gift.id}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 360,
                      y: [0, 20, 0]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={() => catchGift(gift.id)}
                    className="absolute text-3xl hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      left: `${gift.x}%`,
                      top: `${gift.y}%`,
                    }}
                  >
                    {gift.emoji}
                  </motion.button>
                ))}
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-6xl opacity-20">🎂</div>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-4">
              <h4 className="text-2xl font-bold text-purple-700 mb-2">
                🎉 Game Over! 🎉
              </h4>
              <p className="text-lg text-purple-600 mb-4">
                Final Score: <span className="font-bold text-2xl">{score}</span> 🌟
              </p>
              {score >= 100 && (
                <p className="text-pink-600 font-medium">
                  🎊 Amazing! You're a gift-catching champion! 🏆
                </p>
              )}
              {score >= 50 && score < 100 && (
                <p className="text-purple-600 font-medium">
                  🎈 Great job! You caught lots of birthday surprises! 🎁
                </p>
              )}
              {score < 50 && (
                <p className="text-purple-600 font-medium">
                  💝 Good try! Every gift caught is a birthday blessing! ✨
                </p>
              )}
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700"
            >
              🎮 Play Again 🎮
            </Button>
          </motion.div>
        )}

        <div className="text-center mt-4 p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
          <p className="text-xs text-purple-600">
            🎯 Click the gifts as fast as you can! Each gift gives you 10 points! 🎁✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayMiniGame;
