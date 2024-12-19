import { useEffect, useState } from "react";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Image */}
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out transform"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Slider;
