import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import WebTask from "./WebTask";
import AppTask from "./AppTask";
import AITask from "./AITask";
import BackendTask from "./BackendTask";
import UITask from "./UITask";
import CCTask from "./CCTask";
import GraphicTask from "./GraphicTask";
import VideoTask from "./VideoTask";
import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft, GoDownload } from "react-icons/go";
import LinkSubmissionModal from "./LinkSubmissionModal";
import { ToastContainer } from "react-toastify";

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
    // Initialize highlight.js
    hljs.highlightAll();
  }, []);

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
        return <CCTask />;
      case "UI/UX":
        return <UITask />;
      case "GRAPHIC DESIGN":
        return <GraphicTask />;
      case "VIDEO EDITING":
        return <VideoTask />;
      default:
        return <WebTask />;
    }
  };

  const getDocumentLink = () => {
    if (["UI/UX", "GRAPHIC DESIGN", "VIDEO EDITING"].includes(initialDomain)) {
      return "https://docs.google.com/document/d/SPECIAL_DOC_ID_FOR_UI_GRAPHIC_VIDEO/edit?tab=t.0";
    } else {
      return "https://docs.google.com/document/d/1zKB9ItKiIYWgLbp1UBXtpGNT1rSMXPSv9IfDamgHRQc/edit?tab=t.0";
    }
  };

  const displayedTaskName =
    initialDomain === "WEB" || initialDomain === "BACKEND" ? "WEB" : activeTask;

  return (
    <div className="relative font-sans tracking-wide flex flex-col justify-start items-center h-full w-full px-4">
      <ToastContainer />
      <div
        id="taskBox"
        className="w-full max-w-[90vw] lg:max-w-[80vw] rounded-xl h-[90%]"
      >
        <div className="flex flex-col items-center md:flex-row justify-between">
          <div className="text-center gap-x-4 lg:gap-x-8 flex">
            <div
              className="h-10 w-10  items-center cursor-pointer justify-center flex rounded-md mt-2"
              onClick={() => navigate("/dashboard")}
            >
              <GoArrowLeft size={40} />
            </div>
            <p className="text-xl lg:text-5xl lg:mt-2 mt-4 font-bold font-playmegames tracking-widest text-[#F8B95A]">
              {displayedTaskName.toUpperCase()}
            </p>
            {initialDomain === "WEB" && (
              <div className="flex gap-2 lg:gap-8 items-center">
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 lg:py-2  border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "WEB" ? "bg-[#F8B95A]" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTask("WEB")}
                >
                  FRONTEND
                </button>
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "BACKEND" ? "bg-[#F8B95A]" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTask("BACKEND")}
                >
                  BACKEND
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* View Doc Button */}
            <button
              className="ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              onClick={() => {
                window.open(getDocumentLink(), "_blank");
              }}
            >
              <GoDownload className="mr-2" /> VIEW DOC
            </button>

            {/* Submit Task Button */}
            <button
              className="ring-2 ring-[#F8B95A] font-playmegames rounded-md shadow-red-glow text-white mt-2 lg:mt-0 h-8 lg:h-12 text-sm lg:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              SUBMIT TASK
            </button>
          </div>
        </div>

        <div className="border border-white rounded-3xl mt-8 lg:mt-8 w-full p-4 mb-2 flex flex-col justify-center items-center ">
          {renderTaskComponent()}
        </div>
      </div>

      {isModalOpen && (
        <LinkSubmissionModal
          onClose={() => setIsModalOpen(false)}
          subdomain={initialDomain}
        />
      )}
    </div>
  );
}
