import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToastWarning } from "../Toast";

export default function Technical() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentSelections, setCurrentSelections] = usePersistentState<
    string[]
  >("technical", []);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const DOMAINS = [
    { label: "WEB", icon: "/computer.svg" },
    { label: "IOT", icon: "/drone.svg" },
    { label: "APP", icon: "/App.svg" },
    { label: "AI/ML", icon: "/AI.svg" },
    { label: "RND", icon: "/book.svg" },
    { label: "CC", icon: "/computer.svg" }, // Added Cloud Computing
  ];

  useEffect(() => {
    setHoveredIndex(0);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = DOMAINS.length;
    const submitButtonIndex = totalButtons;

    switch (event.key) {
      case "ArrowLeft":
        setHoveredIndex((prev) =>
          prev === null ? 0 : (prev - 1 + totalButtons) % totalButtons
        );
        break;
      case "ArrowRight":
        setHoveredIndex((prev) =>
          prev === null ? 0 : (prev + 1) % totalButtons
        );
        break;
      case "ArrowDown":
        setHoveredIndex(submitButtonIndex);
        break;
      case "ArrowUp":
        if (hoveredIndex === submitButtonIndex) {
          setHoveredIndex(0);
        }
        break;
      case "Enter":
        if (hoveredIndex !== null) {
          if (hoveredIndex === submitButtonIndex) {
            handleOkClick();
          } else {
            handleClick(hoveredIndex);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex((current) => (current !== null ? current : 0));
  };

  const handleClick = (index: number) => {
    const selectedLabel = DOMAINS[index].label;

    // Check if "design" and "management" exist in localStorage
    const isDesignPresent = localStorage.getItem("design") !== null;
    const isManagementPresent = localStorage.getItem("management") !== null;

    if (isDesignPresent && isManagementPresent) {
      // Only allow CC, restrict others
      if (selectedLabel === "CC") {
        setCurrentSelections(["CC"]);
      } else {
        showToastWarning("Only Cloud Computing is allowed in Technical.");
      }
    } else {
      // Normal selection logic (2 domains + CC as extra)
      if (currentSelections.includes(selectedLabel)) {
        setCurrentSelections(
          currentSelections.filter((label) => label !== selectedLabel)
        );
      } else if (currentSelections.length < 2 || selectedLabel === "CC") {
        setCurrentSelections([...currentSelections, selectedLabel]);
      } else {
        showToastWarning("Only 2 Sub-Domains Allowed (unless one is CC)");
      }
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
      <ToastContainer />
      <div className="border-2 border-[#65C54E] mt-[18vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62.5vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[6.06vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">
            TECHNICAL
          </p>
        </div>

        <div className="w-full mt-[4vh] grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
          {DOMAINS.map((domain, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center cursor-pointer p-2 rounded-lg transition-transform duration-300 ${
                hoveredIndex === index ||
                currentSelections.includes(domain.label)
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
              role="button"
              tabIndex={0}
            >
              <img
                className="h-[7.5vh] sm:h-[12.5vh]"
                src={domain.icon}
                alt={domain.label}
              />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentSelections.includes(domain.label)
                    ? "text-[#65C54E] font-bold underline underline-offset-4"
                    : "font-normal no-underline"
                } ${
                  hoveredIndex === index
                    ? currentSelections.includes(domain.label)
                      ? "text-[#65C54E] animate-blink"
                      : "text-white animate-blink"
                    : ""
                }`}
              >
                {hoveredIndex === index ? `> ${domain.label} <` : domain.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleOkClick}
        tabIndex={0}
        className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[10vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
          hoveredIndex === DOMAINS.length
            ? "scale-110 bg-opacity-70"
            : "scale-100"
        }`}
        onMouseEnter={() => handleHover(DOMAINS.length)}
        onMouseLeave={handleLeave}
      >
        OK
      </button>
    </div>
  );
}

function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedState = localStorage.getItem(key);
    return storedState !== null ? JSON.parse(storedState) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
