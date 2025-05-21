
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const photos = [
  "/lovable-uploads/568bd3f0-201a-45f0-9ab0-64ad57793e71.png",
  "/lovable-uploads/31dbe4d0-40ea-4b9f-9bd2-312f63273487.png",
  "/lovable-uploads/64c3bba6-2361-43b6-b3be-4dbdde7ad2ce.png",
  "/lovable-uploads/ca617c2b-634d-4615-9ecc-9ab4a037f596.png",
  "/lovable-uploads/3b428059-ca39-4402-94b7-dfd47663e8b2.png",
  "/lovable-uploads/eb4e9529-9c9e-425a-a7a1-50c2040ff2b9.png"
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl aspect-[4/3] overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <img 
                src={photos[currentIndex]} 
                alt={`Birthday memory ${currentIndex + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-center"
              >
                <p className="text-sm md:text-base">Beautiful memories with family {currentIndex + 1}/{photos.length}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={prevPhoto}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={nextPhoto}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-2 mt-4"
      >
        {photos.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-pink-500" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.5 }}
            aria-label={`Go to photo ${idx + 1}`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PhotoGallery;
