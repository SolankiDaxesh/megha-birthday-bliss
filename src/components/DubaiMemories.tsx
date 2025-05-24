
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Image } from "lucide-react";

const dubaiPhotos = [
  {
    src: "/lovable-uploads/b04b94d6-a0e5-4975-9c77-e24faf048eaf.png",
    caption: "Dubai Adventures - Family Time"
  },
  {
    src: "/lovable-uploads/8e9ed9af-2e16-40e7-bc04-fe189034b7db.png",
    caption: "Beautiful Dubai Moments"
  },
  {
    src: "/lovable-uploads/19f891cc-3c3e-44a9-9c22-d728f1b8841b.png",
    caption: "Stunning Views Together"
  },
  {
    src: "/lovable-uploads/13e8c6e9-e463-4dc2-8307-59f547843c9c.png",
    caption: "Desert Adventures"
  },
  {
    src: "/lovable-uploads/a37d9b48-323e-436f-a62e-e38cea9ff792.png",
    caption: "Magic of Dubai"
  },
  {
    src: "/lovable-uploads/8a67cca9-52c0-47f5-a01c-a6372f27eb83.png",
    caption: "Unforgettable Experiences"
  },
  {
    src: "/lovable-uploads/9441937f-b5a7-43d7-9963-c23385adf1ac.png",
    caption: "Family Love in Dubai"
  }
];

const DubaiMemories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dubaiPhotos.length);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dubaiPhotos.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dubaiPhotos.length) % dubaiPhotos.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={dubaiPhotos[currentIndex].src}
              alt={`Dubai memory ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-script mb-1 sm:mb-2">
                {dubaiPhotos[currentIndex].caption}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-light">
                Memories with family in Dubai {currentIndex + 1}/{dubaiPhotos.length}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/30 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
          <Image size={12} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">{currentIndex + 1} / {dubaiPhotos.length}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 border-none w-8 h-8 sm:w-10 sm:h-10"
        >
          <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
        </Button>
        
        <Button
          variant="outline" 
          size="icon"
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 border-none w-8 h-8 sm:w-10 sm:h-10"
        >
          <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
        </Button>

        <Button
          variant={isAutoPlaying ? "secondary" : "outline"}
          size="sm"
          onClick={toggleAutoPlay}
          className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white text-xs px-2 py-1 sm:px-3 sm:py-1.5"
        >
          <span className="hidden sm:inline">{isAutoPlaying ? "Pause Slideshow" : "Auto Play"}</span>
          <span className="sm:hidden">{isAutoPlaying ? "⏸" : "▶"}</span>
        </Button>
      </motion.div>

      {/* Thumbnail navigation */}
      <div className="flex justify-center gap-1 sm:gap-2 mt-4 sm:mt-6 overflow-x-auto pb-2 px-2 sm:px-4">
        {dubaiPhotos.map((photo, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0 ${
              currentIndex === index ? "ring-2 ring-pink-500" : "ring-1 ring-white/30 opacity-70"
            }`}
          >
            <img
              src={photo.src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {currentIndex === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-pink-500/20 border-2 border-pink-500"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DubaiMemories;
