
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
  const emojis = ['💖', '✨', '🎈', '🌟', '💝'];

  useEffect(() => {
    const createParticle = () => {
      const particle: Particle = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: 10 + Math.random() * 4,
      };
      
      setParticles(prev => [...prev.slice(-8), particle]); // Reduced from 20 to 8 particles max
    };

    const interval = setInterval(createParticle, 4000); // Increased from 2000 to 4000ms
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
            opacity: [0, 0.8, 0.8, 0], // Reduced max opacity from 1 to 0.8
            scale: [0, 0.8, 0.8, 0], // Reduced max scale from 1 to 0.8
            rotate: [0, 360],
            x: particle.x + (Math.random() - 0.5) * 150, // Reduced movement range
          }}
          transition={{
            duration: particle.duration,
            ease: "easeOut",
          }}
          className="absolute text-xl" // Reduced from text-2xl to text-xl
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
