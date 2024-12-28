import { useState } from 'react';

export default function Management() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 2;
    if (event.key === 'ArrowLeft') {
      const prevIndex = (hoveredIndex === null ? 0 : hoveredIndex - 1 + totalButtons) % totalButtons;
      setHoveredIndex(prevIndex);
    } else if (event.key === 'ArrowRight') {
      const nextIndex = (hoveredIndex === null ? 0 : hoveredIndex + 1) % totalButtons;
      setHoveredIndex(nextIndex);
    } else if (event.key === 'Enter') {
      if (hoveredIndex !== null) {
        handleClick(hoveredIndex);
      }
    }
  };

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    setCurrentIndex(index);
    console.log(`Button ${index + 1} clicked`);
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames">
      <div className="border-2 border-[#FF0004] mt-[10vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-24 sm:mt-[6vh]">
          <p className="text-[7vw] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">MANAGEMENT</p>
        </div>

        <div
          className="flex flex-col sm:flex-row  justify-center items-center w-full mt-24"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          {['Events', 'PnM'].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col mb-[3vh] items-center sm:basis-1/2 cursor-pointer nav-button p-4 transition-transform duration-300 ${
                hoveredIndex === index ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-15 sm:h-30"
                src={index === 0 ? '/calendar.svg' : '/microphone.svg'}
                alt={label}
              />
              <p
                className={`text-[3vh] tracking-wider transition-all duration-300 ${
                  currentIndex === index
                    ? 'text-[#FF0004] font-bold underline underline-offset-4'
                    : 'font-normal no-underline'
                } ${
                  hoveredIndex === index
                  ? currentIndex === index ? 'text-[#65C54E] animate-blink' : 'text-white animate-blink'
                    : ''
                }`}
              >
                {hoveredIndex === index ? `> ${label} <` : label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
