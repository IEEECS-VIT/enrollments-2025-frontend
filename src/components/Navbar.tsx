import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = (): void => setIsOpen(!isOpen);

  return (
    <>
      <div className="fixed w-[100vw] h-[8vh] overflow-hidden font-press-start z-30 p-10 pt-16 lg:justify-around justify-between items-center flex">
        <img src="IEEE-CS.svg" className="h-[8vh] hidden lg:block" />
        <button           
          onClick={() => navigate("/")}
          className="text-white text-3xl hover:text-[#F87D10] hover:underline hidden lg:block"
        >
          HOME
        </button>
        <button
          onClick={() => navigate("/faqs")}
          className="text-white text-3xl hover:text-[#F87D10] hover:underline hidden lg:block"
        >
          FAQS
        </button>
        {/* <button
          onClick={() => navigate("/profile")}
          className="text-white text-3xl hover:text-[#F87D10] hover:underline hidden lg:block"
        >
          PROFILE
        </button> */}
        <button
          onClick={() => navigate("/domain")}
          className="text-white text-3xl hover:text-[#F87D10] hover:underline hidden lg:block"
        >
          DOMAINS
        </button> 
        <button
          className="lg:hidden z-50 transition-all duration-500 ease-in-out"
          onClick={toggleMenu}
        >
          <img
            src={isOpen ? "navbar2.svg" : "navbar.svg"}
            className="h-[4vh]"
          />
        </button>
        <div
          onClick={toggleMenu}
          className={`fixed inset-0 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
        <div
          className={`fixed top-0 left-0 h-full w-56 bg-[#272727] bg-opacity-90 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-8 pt-32">
            <ul className="space-y-6 text-2xl text-white font-press-start">
              <li onClick={() => navigate("/")} className="hover:text-[#F87D10] hover:underline cursor-pointer">
                HOME
              </li>
              <li onClick={() => navigate("/faqs")} className="hover:text-[#F87D10] hover:underline cursor-pointer">
                FAQS
              </li>
              <li onClick={() => navigate("/domain")} className="hover:text-[#F87D10] hover:underline cursor-pointer">
                DOMAINS
              </li>
            </ul>
          </nav>
        </div>
        <img
          src="logo2.svg"
          className="h-[5vh] relative left-[7vw] lg:hidden"
        />
        <button onClick={() => navigate("/profile")} className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow flex flex-wrap text-white lg:text-xl text-xs px-2 gap-x-4 mr-3 sm:mr-0 lg:h-14 lg:w-20 h-[6vh] w-[6vh] border border-solid border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 items-center justify-center relative left-[7vw] lg:left-[0vw]">
        <img  className="h-8 w-8 sm:h-12 sm:w-12" src="profile.png"></img>


          
        </button>
      </div>  
    </>
  );
}
