
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Star, Award } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementSystem = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'explorer',
      title: 'Birthday Explorer',
      description: 'Visit all sections of the birthday card',
      icon: '🗺️',
      unlocked: false,
      progress: 0,
      maxProgress: 7
    },
    {
      id: 'gamer',
      title: 'Game Master',
      description: 'Play all the birthday games',
      icon: '🎮',
      unlocked: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'partier',
      title: 'Party Animal',
      description: 'Use confetti cannon 5 times',
      icon: '🎊',
      unlocked: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: 'celebrator',
      title: 'Celebration Expert',
      description: 'Complete cake cutting ceremony',
      icon: '🎂',
      unlocked: false
    },
    {
      id: 'socializer',
      title: 'Social Butterfly',
      description: 'Share the birthday card',
      icon: '🦋',
      unlocked: false
    }
  ]);

  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('birthday-achievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    }
  }, []);

  const updateProgress = (achievementId: string, increment: number = 1) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const newProgress = (achievement.progress || 0) + increment;
          const shouldUnlock = achievement.maxProgress ? newProgress >= achievement.maxProgress : true;
          
          if (shouldUnlock && !achievement.unlocked) {
            setNewUnlock(achievement);
            setTimeout(() => setNewUnlock(null), 3000);
            return { ...achievement, unlocked: true, progress: achievement.maxProgress || 1 };
          }
          
          return { ...achievement, progress: newProgress };
        }
        return achievement;
      });
      
      localStorage.setItem('birthday-achievements', JSON.stringify(updated));
      return updated;
    });
  };

  // Expose function globally for other components to use
  useEffect(() => {
    (window as any).updateAchievement = updateProgress;
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {newUnlock && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 rounded-xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6" />
              <div>
                <div className="font-bold">Achievement Unlocked!</div>
                <div className="text-sm">{newUnlock.icon} {newUnlock.title}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Badge */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <Trophy className="h-4 w-4" />
            <span className="ml-2 text-xs">{unlockedCount}/{totalCount}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Birthday Achievements
              <Award className="h-6 w-6 text-yellow-500" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-purple-700">
                {unlockedCount} / {totalCount} Unlocked
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                      {achievement.maxProgress && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-500">
                            Progress: {achievement.progress || 0} / {achievement.maxProgress}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AchievementSystem;
