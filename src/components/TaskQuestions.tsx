import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import WebTask from "./WebTask";
import AppTask from "./AppTask";
import AITask from "./AITask";
import BackendTask from "./BackendTask";
import UITask from "./UITask";
// import CCTask from "./CCTask"; 
//import GraphicTask from "./GraphicTask";
import VideoTask from "./VideoTask";
import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import LinkSubmissionModal from "./LinkSubmissionModal";
import { ToastContainer } from "react-toastify";
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
      case "VIDEO":
      case "VIDEO EDITING":
        return <VideoTask />;
      default:
        return <WebTask />;
    }
  };

  const displayedTaskName =
    initialDomain === "WEB" || initialDomain === "BACKEND" ? "WEB" : activeTask;

  const getSubmissionDomain = () => {
    const domainMapping: { [key: string]: string } = {
      "UI/UX": "UI/UX",
      "VIDEO EDITING": "VIDEO EDITING",
      "VIDEO": "VIDEO EDITING",
      "EVENTS": "EVENTS",
      "PNM": "PNM",
      
      "WEB": "WEB",       
      "FRONTEND": "WEB",  
      "BACKEND": "WEB",   
      
      "APP": "APP",
      "AI/ML": "AI/ML",
      "CC": "CC",
    };

    return domainMapping[activeTask] || activeTask;
  };

  // Subcategory Logic: Only returns a value for WEB/BACKEND tasks
  const getSubmissionSubcategory = () => {
    if (activeTask === "WEB" || activeTask === "FRONTEND") {
      return "FRONTEND";
    }
    if (activeTask === "BACKEND") {
      return "BACKEND";
    }
    return null; // Returns null for APP, AI/ML, UI/UX etc.
  };

  const handleOpenModal = () => {
    console.log("Submitting Domain:", getSubmissionDomain());
    console.log("Submitting Subcategory:", getSubmissionSubcategory());
    setIsModalOpen(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full px-4 font-sans tracking-wide">
      <ToastContainer />
      <div
        id="taskBox"
        className="w-full h-full flex flex-col"
      >
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between w-full mb-4">

          {/* Left Side: Back Button + Heading + Toggles */}
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer hover:scale-110 transition-transform"
              onClick={() => navigate("/dashboard")}
            >
              <GoArrowLeft size={40} className="text-white" />
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xl lg:text-5xl font-bold font-playmegames tracking-widest text-[#F8B95A]">
                {displayedTaskName?.toUpperCase()}
              </p>

              {initialDomain === "WEB" && (
                <div className="flex items-center gap-2 lg:gap-4 ml-4">
                  <button
                    className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white h-8 lg:h-10 text-xs lg:text-lg px-2 lg:px-4 border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${activeTask === "WEB" ? "bg-[#F8B95A]" : "bg-transparent"
                      }`}
                    onClick={() => setActiveTask("WEB")}
                  >
                    FRONTEND
                  </button>
                  <button
                    className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white h-8 lg:h-10 text-xs lg:text-lg px-2 lg:px-4 border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${activeTask === "BACKEND"
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
          </div>

          {/* Right Side: Submit Button */}
          <div className="flex items-center">
            {activeTask !== 'CC' && (
              <button
                className="ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white h-10 lg:h-12 text-sm lg:text-xl px-4 lg:px-8 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                onClick={handleOpenModal}
              >
                SUBMIT TASK
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 w-full p-4 border border-white rounded-3xl overflow-hidden min-h-0 flex flex-col bg-black/20">
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
          subcategory={getSubmissionSubcategory()} // Pass the subcategory 
        />
      )}
    </div>
  );
}