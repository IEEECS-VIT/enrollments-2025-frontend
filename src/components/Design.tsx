import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToastWarning } from "../Toast";

export default function Design() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentSelections, setCurrentSelections] = usePersistentState<
    string[]
  >("design", []);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setHoveredIndex(0);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 3;
    const submitButtonIndex = totalButtons;

    if (event.key === "ArrowLeft") {
      const prevIndex =
        (hoveredIndex === null ? 0 : hoveredIndex - 1 + totalButtons) %
        totalButtons;
      setHoveredIndex(prevIndex);
    } else if (event.key === "ArrowRight") {
      const nextIndex =
        (hoveredIndex === null ? 0 : hoveredIndex + 1) % totalButtons;
      setHoveredIndex(nextIndex);
    } else if (event.key === "ArrowDown") {
      setHoveredIndex(submitButtonIndex);
    } else if (event.key === "ArrowUp") {
      if (hoveredIndex === submitButtonIndex) {
        setHoveredIndex(0);
      }
    } else if (event.key === "Enter") {
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

  const handleLeave = () =>
    setHoveredIndex((current) => (current !== null ? current : 0));

  const handleClick = (index: number) => {
    const labels = ["UI/UX", "GRAPHIC DESIGN", "VIDEO EDITING"];
    const selectedLabel = labels[index];

    if (
      currentSelections.length < 2 &&
      !currentSelections.includes(selectedLabel)
    ) {
      setCurrentSelections([...currentSelections, selectedLabel]);
    } else if (currentSelections.includes(selectedLabel)) {
      setCurrentSelections(
        currentSelections.filter((label) => label !== selectedLabel)
      );
    } else {
      showToastWarning("Only 2 Sub-Domains Allowed");
    }
  };

  const handleOkClick = () => {
    navigate("/domain");
  };

  return (
    <div
      className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <ToastContainer className="custom-toast-container" />
      <div className="border-2 border-[#0395F1] mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh]">
          <p className="sm:text-[6.06vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">
            DESIGN
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:mt-[8vh] mt-[4vh]">
          {["UI/UX", "GRAPHIC DESIGN", "VIDEO EDITING"].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col mb-[2.5vh] items-center sm:basis-1/3 cursor-pointer nav-button p-4 rounded-lg transition-transform duration-300 ${
                currentSelections.includes(label) ? "scale-110" : "scale-100"
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[7.5vh] sm:h-[15vh]"
                src={
                  index === 0
                    ? "/cherry.svg"
                    : index === 1
                    ? "/grapes.svg"
                    : "/yellowoval.svg"
                }
                alt={label}
              />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentSelections.includes(label)
                    ? "text-[#0395F1] font-bold underline underline-offset-4"
                    : "text-white"
                } ${hoveredIndex === index ? "animate-blink" : ""}`}
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
          hoveredIndex === 3 ? "scale-110 bg-opacity-70" : "scale-100"
        }`}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        OK
      </button>
    </div>
  );
}

function usePersistentState<T>(
  key: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
