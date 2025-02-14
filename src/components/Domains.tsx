import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitDomains } from "../api/user";
import { ToastContainer } from "react-toastify";
import { showToastWarning, showToastSuccess } from "../Toast";

export default function Domains() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }

    const lastVisited = localStorage.getItem("lastVisited");
    if (lastVisited) {
      const lastIndex = ["/management", "/technical", "/design"].indexOf(
        lastVisited
      );
      if (lastIndex !== -1) setHoveredIndex(lastIndex);
    } else {
      setHoveredIndex(0);
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
          handleSubmit();
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
    const managementData = JSON.parse(
      localStorage.getItem("management") || "[]"
    );
    const technicalData = JSON.parse(localStorage.getItem("technical") || "[]");
    const designData = JSON.parse(localStorage.getItem("design") || "[]");

    const nonEmptyCount =
      (managementData.length > 0 ? 1 : 0) +
      (technicalData.length > 0 ? 1 : 0) +
      (designData.length > 0 ? 1 : 0);

    if (
      nonEmptyCount >= 2 &&
      ![managementData, technicalData, designData][index].length
    ) {
      showToastWarning("You can select 2 Domains only");
      return;
    }

    setCurrentIndex(index);
    const paths = ["/management", "/technical", "/design"];
    navigate(paths[index]);
    localStorage.setItem("lastVisited", paths[index]);
  };

  const handleSubmit = async () => {
    const managementData = JSON.parse(localStorage.getItem("management") || "[]");
    const technicalData = JSON.parse(localStorage.getItem("technical") || "[]");
    const designData = JSON.parse(localStorage.getItem("design") || "[]");
  
    if (managementData.length === 0 && technicalData.length === 0 && designData.length === 0) {
      showToastWarning("Choose at least one domain!");
      return; 
    } else {
      const allSelectedData = {
        ...(managementData.length > 0 && { Management: managementData }),
        ...(technicalData.length > 0 && { Technical: technicalData }),
        ...(designData.length > 0 && { Design: designData }),
      };
  
      console.log(allSelectedData);
      
      const response = await SubmitDomains(allSelectedData);
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
        showToastSuccess("Domains selected successfully");
      }
    }
    localStorage.clear();
  };
  

  return (
    <div
      className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <ToastContainer className="custom-toast-container" />
      <div className="border-2 mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="flex justify-between w-full ">
          <div className="ml-8 sm:ml-16">

          </div>
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold sm:leading-[5rem]">
            CHOOSE YOUR
          </p>
          
          <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold leading-[0.5rem] sm:leading-[5rem]">
            ELEMENT
          </p>
        </div>
        <div className="relative group mt-4 sm:mt-8 right-4">
            <span className="text-white text-lg cursor-pointer bg-opacity-50 border-[#F8B95A] border-[0.15rem] shadow-[2px_2px_0px_#FF0000] bg-[#F8B95A] rounded-full w-8 h-8 flex items-center justify-center">
              ℹ️
            </span>
            <div className="absolute left-12 tracking-widest bg-opacity-50 transform -translate-x-80 -translate-y-32 lg:-translate-x-1/2 border-[0.15rem] border-[#F8B95A] mt-2 w-max bg-[#F8B95A] text-white text-md px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Only Final Submission will be considered .
            </div>
          </div>
        </div>
        <div  
          className="flex flex-col sm:flex-row justify-center items-center w-full mt-[6vh]"
          tabIndex={0}
        >
          {["MANAGEMENT", "TECHNICAL", "DESIGN"].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col sm:basis-1/3 items-center cursor-pointer p-2 mb-[2.5vh] sm:mb-0 rounded-md transform transition-transform duration-300 ${
                hoveredIndex === index || currentIndex === index
                  ? "scale-110"
                  : "scale-100"
              }`}
              tabIndex={0}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img
                className="h-[7.5vh] sm:h-[15vh]"
                src={`/${label.toLowerCase()}.svg`}
                alt={label}
              />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentIndex === index ? "font-bold" : "font-normal"
                } ${hoveredIndex === index ? "animate-blink" : ""} ${
                  JSON.parse(localStorage.getItem(label.toLowerCase()) || "[]")
                    .length > 0
                    ? index === 0
                      ? "text-[#FF0004] font-extrabold underline underline-offset-4"
                      : index === 1
                      ? "text-[#65C54E] font-extrabold underline underline-offset-4"
                      : index === 2
                      ? "text-[#0395F1] font-extrabold underline underline-offset-4"
                      : ""
                    : ""
                }`}
              >
                {hoveredIndex === index ? `> ${label} <` : label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        tabIndex={0}
        className={`ring-2 ring-[#F8B95A] tracking-wider rounded-md text-[2.5vh] shadow-red-glow text-white h-[5vh] w-[20vw] bg-[#F8B95A] bg-opacity-50 mt-8 transform transition-transform duration-300 ${
          hoveredIndex === 3 ? "scale-110 bg-opacity-70" : "scale-100"
        } ${hoveredIndex === 3 ? "animate-blink" : ""}`}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        SUBMIT
      </button>
    </div>
  );
}
