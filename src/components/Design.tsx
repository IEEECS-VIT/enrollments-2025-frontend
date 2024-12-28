import { useState } from 'react';

export default function Design() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 3;
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
    <div className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames ">
      <div className="border-2 border-[#0395F1] mt-[10vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[6.06vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">DESIGN</p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center items-center w-full mt-[6vh]"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          {['UI/UX', 'Graphic Design', 'Video Editing'].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col mb-[2.5vh] items-center sm:basis-1/3 cursor-pointer nav-button p-4 rounded-lg transition-transform duration-300 ${
                hoveredIndex === index ? 'scale-110' : 'scale-100'
              }`}
              tabIndex={0}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[7.5vh] sm:h-[15vh]"
                src={index === 0 ? '/cherry.svg' : index === 1 ? '/grapes.svg' : '/yellowoval.svg'}
                alt={label}
              />
              <p
                className={`text-[2.5vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentIndex === index ? 'text-[#0395F1] font-bold underline underline-offset-4' : 'text-white'
                } ${hoveredIndex === index ? 'animate-blink' : ''}`}
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
