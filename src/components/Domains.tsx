import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitDomains } from '../api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Domains() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }

    const lastVisited = localStorage.getItem('lastVisited');
    if (lastVisited) {
      const lastIndex = ['/management', '/technical', '/design'].indexOf(lastVisited);
      if (lastIndex !== -1) setHoveredIndex(lastIndex);
    } else {
      setHoveredIndex(0);
    }
  }, []);

  const handleKeyNavigation = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const totalButtons = 3;
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
    } else if (event.key === 'Enter') {
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

  const handleLeave = () => setHoveredIndex((current) => (current !== null ? current : 0));

  const handleClick = (index: number) => {
    const managementData = JSON.parse(localStorage.getItem('management') || '[]');
    const technicalData = JSON.parse(localStorage.getItem('technical') || '[]');
    const designData = JSON.parse(localStorage.getItem('design') || '[]');
  
    const nonEmptyCount =
      (managementData.length > 0 ? 1 : 0) +
      (technicalData.length > 0 ? 1 : 0) +
      (designData.length > 0 ? 1 : 0);
  
    if (nonEmptyCount >= 2 && ![managementData, technicalData, designData][index].length) {
      toast.warning('You can select 2 Domains only', {
        
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className:"custom-toast",
      });
      return;
    }
  
    setCurrentIndex(index);
    const paths = ['/management', '/technical', '/design'];
    navigate(paths[index]);
    localStorage.setItem('lastVisited', paths[index]);
  };
  

  const handleSubmit = async () => {
    const managementData = JSON.parse(localStorage.getItem('management') || '[]');
    const technicalData = JSON.parse(localStorage.getItem('technical') || '[]');
    const designData = JSON.parse(localStorage.getItem('design') || '[]');

    const allSelectedData = {
    ...(managementData.length > 0 && { Management: managementData }),
    ...(technicalData.length > 0 && { Technical: technicalData }),
    ...(designData.length > 0 && { Design: designData }),
  };

    console.log(allSelectedData);
    toast.success('Domains selected successfully', {
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast",
    });

    const response = await SubmitDomains(allSelectedData);
    if(response.status==200){
      setTimeout(() => {
        navigate("/profile");
        localStorage.clear(); 
      }, 3000); 
    }
   }


  return (
    <div
      className="text-white min-h-screen flex flex-col items-center justify-center font-playmegames"
      ref={containerRef}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <ToastContainer className="custom-toast-container"/>
      <div className="border-2 mt-[15vh] rounded-3xl w-[80%] sm:w-[80%] md:w-[80%] lg:w-[70%] sm:h-[60vh] h-[70vh] flex flex-col items-center">
        <div className="text-center mt-[6vh] sm:mt-[6vh]">
          <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold sm:leading-[5rem]">CHOOSE YOUR</p>
          <p className="sm:text-[6.06vw] tracking-wider text-[3.5vh] font-bold leading-[0.5rem] sm:leading-[5rem]">ELEMENT</p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center items-center w-full mt-[6vh]"
          tabIndex={0}
        >
          {['MANAGEMENT', 'TECHNICAL', 'DESIGN'].map((label, index) => (
            <div
              key={index}
              className={`flex flex-col sm:basis-1/3 items-center cursor-pointer p-2 mb-[2.5vh] sm:mb-0 rounded-md transform transition-transform duration-300 ${
                hoveredIndex === index || currentIndex === index ? 'scale-110' : 'scale-100'
              }`}
              tabIndex={0}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <img className="h-[7.5vh] sm:h-[15vh]" src={`/${label.toLowerCase()}.svg`} alt={label} />
              <p
                className={`text-[2.75vh] sm:text-[1.85vh] md:text-[2.15vh] lg:text-[2.75vh] tracking-wider transition-all duration-300 ${
                  currentIndex === index ? 'font-bold' : 'font-normal'
                } ${
                  hoveredIndex === index ? 'animate-blink' : ''
                } ${
                  JSON.parse(localStorage.getItem(label.toLowerCase()) || '[]').length > 0
                    ? index === 0
                      ? 'text-[#FF0004] font-extrabold underline underline-offset-4'
                      : index === 1
                      ? 'text-[#65C54E] font-extrabold underline underline-offset-4'
                      : index === 2
                      ? 'text-[#0395F1] font-extrabold underline underline-offset-4'
                      : ''
                    : ''
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
          hoveredIndex === 3 ? 'scale-110 bg-opacity-70' : 'scale-100'
        } ${hoveredIndex === 3 ? 'animate-blink' : ''}`}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        SUBMIT
      </button>
    </div>
  );
}