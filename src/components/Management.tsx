import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function usePersistentState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function Management() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentIndexes, setCurrentIndexes] = usePersistentState<number[]>('management', []);
  const navigate = useNavigate(); 

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHoveredIndex(0);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 2;
    const submitButtonIndex = totalButtons;

    if (event.key === 'ArrowLeft') {
      const prevIndex = (hoveredIndex === null ? 0 : hoveredIndex - 1 + totalButtons) % totalButtons;
      setHoveredIndex(prevIndex);
    } else if (event.key === 'ArrowRight') {
      const nextIndex = (hoveredIndex === null ? 0 : hoveredIndex + 1) % totalButtons;
      setHoveredIndex(nextIndex);
    }else if (event.key === 'ArrowDown') {
      setHoveredIndex(submitButtonIndex); 
    } else if (event.key === 'ArrowUp') {
      if (hoveredIndex === submitButtonIndex) {
        setHoveredIndex(0);
      }
    }  
     else if (event.key === 'Enter') {
      if (hoveredIndex !== null) {
        if (hoveredIndex === submitButtonIndex) {
          handleOkClick(); 
        } else {
          handleClick(hoveredIndex); 
        }
      }
    }
  };

  const handleHover = (index: number) => setHoveredIndex(index);

  const handleLeave = () => setHoveredIndex((current) => (current !== null ? current : 0));

  const handleClick = (index: number) => {
    if (currentIndexes.length < 2 && !currentIndexes.includes(index)) {
      setCurrentIndexes([...currentIndexes, index]);
    } else if (currentIndexes.includes(index)) {
      setCurrentIndexes(currentIndexes.filter((i) => i !== index));
    }
  };

  const handleOkClick = () => {
    navigate('/domain'); // Navigate to the /domains route
  };

  return (
    <div
      className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <div className="border-2 border-[#FF0004] mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-24 sm:mt-[6vh]">
          <p className="text-[7vw] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">MANAGEMENT</p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center items-center w-full mt-24"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          {['Events', 'PnM'].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col mb-[3vh] items-center sm:basis-1/2 cursor-pointer nav-button p-4 transition-transform duration-300 ${
                currentIndexes.includes(index) ? 'scale-110' : 'scale-100'
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[7.5vh] sm:h-[12.5vh]"
                src={index === 0 ? '/calendar.svg' : '/microphone.svg'}
                alt={label}
              />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentIndexes.includes(index)
                    ? 'text-[#FF0004] font-bold underline underline-offset-4'
                    : 'font-normal no-underline'
                } ${hoveredIndex === index ? 'animate-blink' : ''}`}
              >
                {hoveredIndex === index ? `> ${label} <` : label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleOkClick}
        tabIndex={0} 
        className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[10vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
          hoveredIndex === 2 ? 'scale-110 bg-opacity-70' : 'scale-100'
        }`}
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        OK
      </button>
    </div>
  );
}
