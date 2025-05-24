
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const emojis = ['💖', '✨', '🎈', '🌟', '💝', '🎂', '🎉', '🎊'];

  useEffect(() => {
    const createParticle = () => {
      const particle: Particle = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: 8 + Math.random() * 4,
      };
      
      setParticles(prev => [...prev.slice(-20), particle]); // Keep max 20 particles
    };

    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, opacity: 0, scale: 0 }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 360],
            x: particle.x + (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
          className="absolute text-2xl"
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
