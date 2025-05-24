
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Card3DProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

const Card3D = ({ front, back, className = "" }: Card3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {front}
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          {back}
        </div>
      </motion.div>
      
      <p className="text-center text-sm text-gray-600 mt-2">
        Click to flip the card!
      </p>
    </div>
  );
};

export default Card3D;
