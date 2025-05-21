
import { useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const photos = [
  "/lovable-uploads/b04b94d6-a0e5-4975-9c77-e24faf048eaf.png",
  "/lovable-uploads/8e9ed9af-2e16-40e7-bc04-fe189034b7db.png",
  "/lovable-uploads/19f891cc-3c3e-44a9-9c22-d728f1b8841b.png",
  "/lovable-uploads/13e8c6e9-e463-4dc2-8307-59f547843c9c.png",
  "/lovable-uploads/a37d9b48-323e-436f-a62e-e38cea9ff792.png",
  "/lovable-uploads/8a67cca9-52c0-47f5-a01c-a6372f27eb83.png",
  "/lovable-uploads/9441937f-b5a7-43d7-9963-c23385adf1ac.png",
];

const BirthdayGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8">
      <div className="relative overflow-hidden rounded-xl shadow-xl aspect-[4/5] bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Photo counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-2">
          <Images size={16} />
          <span className="text-sm font-medium">{currentIndex + 1} / {photos.length}</span>
        </div>
        
        {/* Navigation buttons */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white border-none shadow-lg"
          onClick={goToPrevious}
        >
          <ChevronLeft />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white border-none shadow-lg"
          onClick={goToNext}
        >
          <ChevronRight />
        </Button>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-12 rounded-md overflow-hidden flex-shrink-0 transition-all transform ${
              currentIndex === index 
                ? "ring-2 ring-pink-500 scale-105" 
                : "ring-1 ring-gray-300 opacity-70"
            }`}
          >
            <img
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BirthdayGallery;
