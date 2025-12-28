import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import WebTask from "./WebTask";
import AppTask from "./AppTask";
import AITask from "./AITask";
import BackendTask from "./BackendTask";
import UITask from "./UITask";
// import CCTask from "./CCTask"; // FIX: Commented out because we are using a redirect now
//import GraphicTask from "./GraphicTask";
import VideoTask from "./VideoTask";
import { useNavigate, useLocation } from "react-router-dom";
//import { GoArrowLeft, GoDownload } from "react-icons/go"; //commented out as removed the download button
import { GoArrowLeft} from "react-icons/go";
import LinkSubmissionModal from "./LinkSubmissionModal";
import { ToastContainer } from "react-toastify";
//import RNDTask from "./RNDTask";
import Loader from "./Loader";

export default function TaskQuestions() {
  const location = useLocation();
  const initialDomain = location.state?.subDomain || null;
  const [activeTask, setActiveTask] = useState(initialDomain);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.subDomain) {
      navigate("/dashboard");
    }
  }, [location, navigate]);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (activeTask === "CC") {
      window.location.href = "https://battlecode.ieeecsvit.com";
    }
  }, [activeTask]);

  const renderTaskComponent = () => {
    switch (activeTask) {
      case "WEB":
        return <WebTask />;
      case "BACKEND":
        return <BackendTask />;
      case "APP":
        return <AppTask />;
      case "AI/ML":
        return <AITask />;
      case "CC":
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <h2 className="text-2xl font-bold text-[#F8B95A] mb-4">Redirecting to BattleCode...</h2>
                <Loader />
            </div>
        ); 
      case "UI/UX":
        return <UITask />;
      // case "GRAPHIC DESIGN":
      //   return <GraphicTask />;
      
      // FIX: Added "VIDEO" case to match the dashboard subdomain, resolving the issue where it showed Frontend task
      case "VIDEO": 
      case "VIDEO EDITING":
        return <VideoTask />;
        
      // case "RND":
      //   return <RNDTask />;
      default:
        return <WebTask />;
    }
  };

  const displayedTaskName =
    initialDomain === "WEB" || initialDomain === "BACKEND" ? "WEB" : activeTask;

  const getSubmissionDomain = () => {
    // Mapping based on backend python dictionary requirements
    const domainMapping: { [key: string]: string } = {
      "UI/UX": "ui",
      "VIDEO EDITING": "video",
      "VIDEO": "video", // Handle dashboard variant
      "EVENTS": "events",
      "PNM": "pnm",
      "WEB": "web",
      "FRONTEND": "web",
      "BACKEND": "web", // Explicitly maps BACKEND to web as requested
      "APP": "app",
      "AI/ML": "ai",
      "CC": "cc",
      // "GRAPHIC DESIGN": "graphic", 
      // "IOT": "iot",
      // "RND": "rnd",
    };

    // Return the mapped key, or fallback to activeTask (safeguard)
    return domainMapping[activeTask] || activeTask;
  };

  const handleOpenModal = () => {
    console.log("Submitting for Domain:", getSubmissionDomain()); // Debugging Log
    setIsModalOpen(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full px-4 font-sans tracking-wide">
      <ToastContainer />
      <div
        id="taskBox"
        className="w-full max-w-[90vw] lg:max-w-[80vw] rounded-xl h-[90%]"
      >
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-wrap items-center justify-center text-center gap-x-4 lg:gap-x-8">
            <div
              className="flex items-center justify-center w-10 h-10 mt-2 rounded-md cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <GoArrowLeft size={40} />
            </div>
            <p className="text-xl lg:text-5xl lg:mt-2 mt-4 font-bold font-playmegames tracking-widest text-[#F8B95A]">
              {displayedTaskName?.toUpperCase()}
            </p>
            {initialDomain === "WEB" && (
              <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-6">
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 lg:py-2  border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "WEB" ? "bg-[#F8B95A]" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTask("WEB")}
                >
                  FRONTEND
                </button>
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 lg:py-2  border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "BACKEND"
                      ? "bg-[#F8B95A]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setActiveTask("BACKEND")}
                >
                  BACKEND
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center w-full p-2 md:p-4 mt-2 md:mt-8 mb-2 border border-white rounded-3xl lg:mt-8">
            
            {activeTask !== 'CC' && (
                <button
                className="ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
                onClick={handleOpenModal}
              >
                SUBMIT TASK
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 w-full p-4 mt-4 mb-2 border border-white rounded-3xl overflow-hidden min-h-0 flex flex-col">
          {renderTaskComponent()}
        </div>
      </div>

      {isModalOpen && (
        <LinkSubmissionModal
          tech={
            !(
              activeTask === "VIDEO EDITING" ||
              activeTask === "UI/UX" ||
              activeTask === "GRAPHIC DESIGN"
            )
          }
          onClose={() => setIsModalOpen(false)}
          subdomain={getSubmissionDomain()}
        />
      )}
    </div>
  );
}