import React, { useState } from 'react';

export default function Technical() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 5;
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
      <div className="border-2 border-[#65C54E] sm:mt-0 mt-[10vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[66vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[7vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">TECHNICAL</p>
        </div>

        <div
          className="flex flex-col flex-nowrap sm:flex-row sm:flex-wrap justify-center items-center w-full mt-[6vh]"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          {['WEB', 'IOT', 'APP', 'AI/ML', 'RND'].map((label, index) => (
            <div
              key={index}
              className={`basis-1/3 flex flex-col items-center cursor-pointer sm:p-4 rounded-lg transition-transform duration-300 ${
                index >= 3 ? 'basis-1/2' : ''
              } transform ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[5.5vh] sm:h-[12.5vh]"
                src={index === 0 ? '/computer.svg' : index === 1 ? '/drone.svg' : index === 2 ? '/App.svg' : index === 3 ? '/AI.svg' : '/book.svg'}
                alt={label}
              />
               <p
                className={`text-[3vh] tracking-wider transition-all duration-300 ${
                  currentIndex === index
                    ? 'text-[#65C54E] font-bold underline underline-offset-4'
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
