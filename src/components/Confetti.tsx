
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Initial confetti burst
    myConfetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ba55d3', '#9370db', '#8a2be2'],
    });

    // Multiple bursts for a more festive effect
    const intervalId = setInterval(() => {
      myConfetti({
        particleCount: 50,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ba55d3', '#9370db', '#8a2be2'],
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Confetti;
