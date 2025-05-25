
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const fireFirecracker = () => {
      // Firecracker burst - quick succession of small bursts
      myConfetti({
        particleCount: 50,
        spread: 60,
        startVelocity: 35,
        origin: { x: 0.3, y: 0.8 },
        colors: ['#ff0000', '#ff4500', '#ffd700', '#ff6347'],
        shapes: ['circle'],
        scalar: 0.8,
      });

      setTimeout(() => {
        myConfetti({
          particleCount: 40,
          spread: 50,
          startVelocity: 30,
          origin: { x: 0.7, y: 0.8 },
          colors: ['#ff1493', '#ff69b4', '#ffd700'],
          shapes: ['circle'],
          scalar: 0.8,
        });
      }, 200);

      setTimeout(() => {
        myConfetti({
          particleCount: 60,
          spread: 70,
          startVelocity: 40,
          origin: { x: 0.5, y: 0.8 },
          colors: ['#ff0080', '#ff8000', '#ffff00'],
          shapes: ['circle'],
          scalar: 0.9,
        });
      }, 400);
    };

    const fireReducedFireworks = () => {
      // Gentler firework burst
      myConfetti({
        particleCount: 80,
        spread: 120,
        startVelocity: 45,
        origin: { x: Math.random() * 0.6 + 0.2, y: 0.7 },
        colors: ['#ff69b4', '#ba55d3', '#9370db', '#dda0dd'],
        shapes: ['star', 'circle'],
        scalar: 1.0,
      });
    };

    // Initial firecracker sequence
    fireFirecracker();
    setTimeout(fireFirecracker, 1000);
    setTimeout(fireFirecracker, 2000);

    // After initial sequence, switch to gentler fireworks every 8 seconds
    const timeoutId = setTimeout(() => {
      fireReducedFireworks();
      const intervalId = setInterval(fireReducedFireworks, 8000);
      
      return () => clearInterval(intervalId);
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Fireworks;
