import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Technical() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [selectedIndices, setSelectedIndices] = usePersistentState<number[]>('technical', []);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    setHoveredIndex(0);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 5;
    const submitButtonIndex = totalButtons;

    if (event.key === 'ArrowLeft') {
      const prevIndex = (hoveredIndex === null ? 0 : hoveredIndex - 1 + totalButtons) % totalButtons;
      setHoveredIndex(prevIndex);
    } else if (event.key === 'ArrowRight') {
      const nextIndex = (hoveredIndex === null ? 0 : hoveredIndex + 1) % totalButtons;
      setHoveredIndex(nextIndex);
    } else if (event.key === 'ArrowDown') {
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

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex((current) => (current !== null ? current : 0));
  };

  const handleClick = (index: number) => {
    if (selectedIndices.length < 2 && !selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
    } else if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    }
  };

  const handleOkClick = () => {
    navigate('/domain'); // Navigates to the /domains route
};


  return (
    <div
      className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <div className="border-2 border-[#65C54E] mt-[18vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62.5vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[6.06vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">TECHNICAL</p>
        </div>

        <div
          className="w-full mt-[4vh] grid grid-cols-2 grid-rows-3 sm:flex sm:flex-wrap justify-center items-center"
          onKeyDown={handleKeyNavigation}
          tabIndex={0}
        >
          {['WEB', 'IOT', 'APP', 'AI/ML', 'RND'].map((label, index) => (
            <div
              key={index}
              className={`${
                index === 2 ? 'col-span-2 ' : ''
              } sm:basis-1/3 sm:flex-col mb-[2.5vh] mt-[2.5vh] sm:mt-0 sm:mb-0 sm:p-4 basis-auto flex flex-col items-center cursor-pointer p-2 rounded-lg transition-transform duration-300 ${
                index >= 3 ? 'sm:basis-1/2' : ''
              } transform ${hoveredIndex === index || selectedIndices.includes(index) ? 'scale-110' : 'scale-100'}`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[7.5vh] sm:h-[12.5vh]"
                src={index === 0 ? '/computer.svg' : index === 1 ? '/drone.svg' : index === 2 ? '/App.svg' : index === 3 ? '/AI.svg' : '/book.svg'}
                alt={label}
              />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  selectedIndices.includes(index)
                    ? 'text-[#65C54E] font-bold underline underline-offset-4'
                    : 'font-normal no-underline'
                } ${
                  hoveredIndex === index
                    ? selectedIndices.includes(index)
                      ? 'text-[#65C54E] animate-blink'
                      : 'text-white animate-blink'
                    : ''
                }`}
              >
                {hoveredIndex === index || selectedIndices.includes(index)
                  ? `> ${label} <`
                  : label}
              </p>
            </div>
          ))}
        </div>
       </div>
       <button
        onClick={handleOkClick}
        tabIndex={0} 
        className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[10vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
          hoveredIndex === 5 ? 'scale-110 bg-opacity-70' : 'scale-100'
        }`}
        onMouseEnter={() => setHoveredIndex(5)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        OK
      </button>

    </div>
  );
}

function usePersistentState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedState = localStorage.getItem(key);
    return storedState !== null ? JSON.parse(storedState) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
