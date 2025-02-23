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
      {/* Slide Content */}
      <div 
        className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center 
        bg-gradient-to-r from-black/60 to-transparent text-white p-8"
      >
        <h1 className="
          text-5xl font-bold mb-4 tracking-wide 
          transform transition-all duration-[1500ms] 
          animate-text-reveal
          bg-clip-text text-transparent
          bg-gradient-to-r from-white via-white to-white/80
          filter hover:brightness-125
          leading-[1.2]
          max-w-4xl
          text-shadow-lg
        ">
          {slides[currentIndex].title}
        </h1>
        <p className="
          text-2xl font-light opacity-90 max-w-2xl mx-auto 
          transform transition-all duration-[1800ms] 
          animate-text-float
          text-white/90 
          italic
          tracking-wide
          hover:text-white/100
          transition-all ease-in-out
        ">
          {slides[currentIndex].description}
        </p>
      </div>

      {/* Slide Image */}
      <div 
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transition: 'background-image 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="absolute inset-0 group"
      />

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <button 
          onClick={goToPrevious}
          className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((slide, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`
              w-3 h-3 rounded-full transition-all duration-500 ease-in-out
              ${currentIndex === slideIndex 
                ? 'bg-white w-8 scale-125' 
                : 'bg-white/50 hover:bg-white/80'}
            `}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
