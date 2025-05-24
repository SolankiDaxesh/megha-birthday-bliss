
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

    const fireFireworks = () => {
      // Firework burst 1
      myConfetti({
        particleCount: 150,
        spread: 160,
        startVelocity: 55,
        origin: { x: 0.2, y: 0.7 },
        colors: ['#ff0080', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff'],
        shapes: ['star', 'circle'],
        scalar: 1.2,
      });

      // Firework burst 2
      setTimeout(() => {
        myConfetti({
          particleCount: 150,
          spread: 160,
          startVelocity: 55,
          origin: { x: 0.8, y: 0.7 },
          colors: ['#ff1493', '#00ced1', '#ffd700', '#ff6347', '#98fb98'],
          shapes: ['star', 'circle'],
          scalar: 1.2,
        });
      }, 400);

      // Firework burst 3
      setTimeout(() => {
        myConfetti({
          particleCount: 200,
          spread: 180,
          startVelocity: 60,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#ff69b4', '#ba55d3', '#9370db', '#8a2be2', '#dda0dd'],
          shapes: ['star'],
          scalar: 1.5,
        });
      }, 800);
    };

    // Initial fireworks
    fireFireworks();

    // Repeat fireworks every 5 seconds
    const intervalId = setInterval(fireFireworks, 5000);

    return () => {
      clearInterval(intervalId);
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
