
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  emoji: string;
}

const GuestBook = () => {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      name: "Your Brother 👨‍💼",
      message: "Happy Birthday Megha! 🎉 Hope your day is as wonderful as you are! May this year bring you endless joy and beautiful memories! 🌟✨",
      timestamp: new Date(),
      emoji: "🎂"
    },
    {
      id: 2,
      name: "Mom & Dad 👨‍👩‍👧",
      message: "Our dearest Megha, watching you grow has been our greatest joy! 💖 Have the most amazing birthday celebration! 🎈🎊",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      emoji: "💝"
    }
  ]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="h-6 w-6 text-purple-600" />
          <h3 className="text-2xl font-script font-bold text-purple-700">
            🎂 Birthday Guest Book 📝
          </h3>
          <Heart className="h-5 w-5 text-pink-500 fill-pink-200" />
        </div>

        <div className="text-center mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <p className="text-purple-700 font-medium">
            💕 Beautiful messages from your loved ones 💕
          </p>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-400"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{msg.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-purple-700">{msg.name}</span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{msg.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6 p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">
            ✨ Every message is filled with love for you! ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestBook;
