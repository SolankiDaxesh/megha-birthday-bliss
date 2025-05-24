
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  emoji: string;
}

const GuestBook = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Your Brother",
      message: "Happy Birthday Megha! Hope your day is as wonderful as you are! 🎉",
      timestamp: new Date(),
      emoji: "🎂"
    }
  ]);
  const [isAddingMessage, setIsAddingMessage] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  const emojis = ["🎉", "🎂", "💖", "🌟", "🎈", "✨", "🎊", "💝"];

  const addMessage = () => {
    if (newName.trim() && newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        name: newName.trim(),
        message: newMessage.trim(),
        timestamp: new Date(),
        emoji: selectedEmoji
      };
      
      setMessages(prev => [message, ...prev]);
      setNewName("");
      setNewMessage("");
      setIsAddingMessage(false);
    }
  };

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
            Birthday Guest Book
          </h3>
          <Heart className="h-5 w-5 text-pink-500 fill-pink-200" />
        </div>

        {!isAddingMessage ? (
          <Button
            onClick={() => setIsAddingMessage(true)}
            className="w-full mb-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Leave a Birthday Message
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-4 bg-white rounded-lg shadow-sm"
          >
            <input
              type="text"
              placeholder="Your name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <textarea
              placeholder="Write your birthday message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-3 h-24 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="flex gap-2 mb-3">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-2 rounded-lg text-lg transition-all ${
                    selectedEmoji === emoji 
                      ? "bg-purple-100 scale-110" 
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={addMessage} className="bg-purple-500 hover:bg-purple-600">
                Add Message
              </Button>
              <Button 
                onClick={() => setIsAddingMessage(false)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
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
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GuestBook;
