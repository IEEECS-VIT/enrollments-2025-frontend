import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import WebTask from "./WebTask";
import AppTask from "./AppTask";
import AITask from "./AITask";
import BackendTask from "./BackendTask";
import CCTask from "./CCTask";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";


export default function TaskQuestions() {
  const [activeTask, setActiveTask] = useState("web");
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize highlight.js
    hljs.highlightAll();
  }, []);

  return (
    <div className="relative font-sans tracking-wide flex flex-col justify-start items-center h-full w-full px-4">
      <div
        id="taskBox"
        className="w-full max-w-[90vw] lg:max-w-[80vw] rounded-xl"
      >
        <div className="flex flex-col items-center sm:flex-row justify-between">
          <div className="text-center gap-x-8 flex">
            <div className="h-10 w-10 items-center cursor-pointer justify-center flex rounded-md"onClick={() => navigate("/dashboard")}>
            <GoArrowLeft size={40}/>
            </div>
            <p className="text-5xl font-bold font-playmegames tracking-widest text-[#F8B95A]">
              WEB
            </p>
          </div>

          {/* <div className="flex flex-wrap gap-8 justify-center">
            {["EASY", "MEDIUM", "HARD"].map((level) => (
              <button
                key={level}
                className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow text-white mt-2 sm:mt-0 h-12 sm:h-12 text-xl sm:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                {level}
              </button>
            ))}
          </div> */}
          <div className="flex gap-8">
          <button
          className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 sm:mt-0 h-12 sm:h-12 text-xl sm:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
            activeTask === "web" ? "bg-[#F8B95A]" : "bg-transparent"
          }`}
          onClick={() => setActiveTask("web")}
        >
          FRONTEND
        </button>
        <button
          className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 sm:mt-0 h-12 sm:h-12 text-xl sm:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
            activeTask === "backend" ? "bg-[#F8B95A]" : "bg-transparent"
          }`}
          onClick={() => setActiveTask("backend")}
        >
          BACKEND
        </button>
          </div>
          <button
                className="ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 sm:mt-0 h-12 sm:h-12 text-xl sm:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                SUBMIT LINKS
              </button>
        </div>

        <div className="border border-white rounded-3xl mt-8 sm:mt-8 w-full p-4 mb-2 flex flex-col justify-center items-center ">
          
          {/* <WebTask></WebTask> */}
          {/* <AppTask></AppTask> */} 
          {/* <AITask></AITask> */}
          {/* <BackendTask></BackendTask> */}
          {/* {<CCTask></CCTask>} */}
          {activeTask === "web" ? <WebTask /> : <BackendTask />}
        </div>
      </div>
    </div>
  );
}

