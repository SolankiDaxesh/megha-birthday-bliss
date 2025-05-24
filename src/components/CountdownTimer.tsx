import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Set next birthday and add 5 days
      let nextBirthday = new Date(currentYear + 1, now.getMonth(), now.getDate());
      nextBirthday.setDate(nextBirthday.getDate() + 5);
      
      const difference = nextBirthday.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="text-center p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="h-6 w-6 text-purple-600" />
        <h3 className="text-xl font-script font-bold text-purple-700">
          Until Next Birthday
        </h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-3 shadow-sm"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-purple-700"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-sm text-gray-600 font-medium">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-sm text-gray-600 mt-4 italic">
        The countdown to making this day special again! 🎂
      </p>
    </div>
  );
};

export default CountdownTimer;
