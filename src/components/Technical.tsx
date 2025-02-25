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
    { label: "CC", icon: "/cc.svg" },
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

    const isDesignPresent = (() => {
      const item = localStorage.getItem("design");
      return item !== null && item !== "[]";
    })();

    const isManagementPresent = (() => {
      const item = localStorage.getItem("management");
      return item !== null && item !== "[]";
    })();

    if (isDesignPresent && isManagementPresent) {
      if (selectedLabel === "CC") {
        setCurrentSelections((prev) => (prev.includes("CC") ? [] : ["CC"]));
      } else {
        showToastWarning(
          "Only CC is allowed in Technical when selecting three domains.To proceed with this sub-domain, deselect one of the other domains."
        );
      }
    } else {
      setCurrentSelections((prev) => {
        const isCCSelected = prev.includes("CC");

        if (prev.includes(selectedLabel)) {
          return prev.filter((label) => label !== selectedLabel);
        } else if (isCCSelected) {
          if (prev.length < 3) {
            return [...prev, selectedLabel];
          } else {
            showToastWarning("Only 2 Sub-Domains Allowed (plus CC)");
            return prev;
          }
        } else {
          if (prev.length < 2 || selectedLabel === "CC") {
            return [...prev, selectedLabel];
          } else {
            showToastWarning("Only 2 Sub-Domains Allowed (unless one is CC)");
            return prev;
          }
        }
      });
    }
  };

  const handleOkClick = () => {
    navigate("/domain");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <ToastContainer />
      <div className="border-2 border-[#65C54E] mt-[18vh] rounded-3xl w-[80%] backdrop-blur-[4.5px] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[62.5vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[4vh]">
          <p className="sm:text-[6.06vw] text-[3.5vh] font-bold tracking-wider leading-[0.5rem] sm:leading-[5rem]">
            TECHNICAL
          </p>
        </div>
        <div className="mt-8 ml-2 text-sm text-center text-yellow-400 sm:text-lg sm:mt-0 sm:ml-0">
          *CC ( Competitive Coding ) can be chosen as an additional subdomain
          under Tech.
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
