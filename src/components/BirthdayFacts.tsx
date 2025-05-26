
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";

const BirthdayFacts = () => {
  const facts = [
    "🎂 The tradition of birthday cakes dates back to ancient Greece!",
    "🎈 The most popular birthday is September 9th worldwide!",
    "🎵 'Happy Birthday' is the most recognized song in English!",
    "🎁 Birthday celebrations were once considered pagan by early Christians!",
    "🕯️ Birthday candles represent the light of life and make wishes come true!",
    "🎊 In some cultures, being born on your birthday is considered extra lucky!",
    "🎉 The average person celebrates 75 birthdays in their lifetime!",
    "🎂 Birthday cake for breakfast is a tradition in some families!",
    "🎈 Balloon decorations started in the early 1900s for birthdays!",
    "✨ Making a wish on birthday candles dates back to ancient times!",
    "🎁 Gift-giving on birthdays represents hope for a prosperous year!",
    "🎵 In some countries, people pull earlobes for each year of life!",
  ];

  const quotes = [
    "Age is merely mind over matter. If you don't mind, it doesn't matter! 🧠✨",
    "Birthdays are nature's way of telling us to eat more cake! 🍰🎂",
    "Another year older, another year wiser, another year more fabulous! 💫",
    "Life is a gift, and birthdays are the ribbons! 🎁🎀",
    "Growing old is mandatory, but growing up is optional! 🎈😄",
    "Birthdays are the universe's way of celebrating you! 🌟🎉",
    "Every birthday is a chance to start fresh and dream bigger! ✨💭",
    "You're not getting older, you're leveling up! 🎮⬆️",
  ];

  const [currentFact, setCurrentFact] = useState(facts[0]);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setCurrentFact(randomFact);
  };

  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Fun Facts */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-script font-bold text-indigo-700">
            🎂 Birthday Fun Facts 🎂
          </h3>
        </div>

        <motion.div
          key={currentFact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 mb-4 shadow-sm"
        >
          <p className="text-indigo-700 text-center font-medium">{currentFact}</p>
        </motion.div>

        <div className="text-center">
          <Button
            onClick={getRandomFact}
            variant="outline"
            className="bg-white/50 hover:bg-white/70"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Fact!
          </Button>
        </div>
      </div>

      {/* Inspiring Quotes */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-script font-bold text-purple-700">
            ✨ Birthday Wisdom ✨
          </h3>
        </div>

        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 mb-4 shadow-sm"
        >
          <p className="text-purple-700 text-center font-medium italic">{currentQuote}</p>
        </motion.div>

        <div className="text-center">
          <Button
            onClick={getRandomQuote}
            variant="outline"
            className="bg-white/50 hover:bg-white/70"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Quote!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayFacts;
