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
              {displayedTaskName.toUpperCase()}
            </p>
            {initialDomain === "WEB" && (
              <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-6">
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md text-white mt-2 lg:mt-0 h-10 lg:h-12 text-sm lg:text-xl px-4 lg:px-6 py-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "WEB"
                      ? "bg-[#F8B95A]"
                      : "bg-transparent border border-[#F8B95A]"
                  }`}
                  onClick={() => setActiveTask("WEB")}
                >
                  FRONTEND
                </button>
                <button
                  className={`ring-2 ring-[#F8B95A] font-playmegames rounded-md text-white mt-2 lg:mt-0 h-10 lg:h-12 text-sm lg:text-xl px-4 lg:px-6 py-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 ${
                    activeTask === "BACKEND"
                      ? "bg-[#F8B95A]"
                      : "bg-transparent border border-[#F8B95A]"
                  }`}
                  onClick={() => setActiveTask("BACKEND")}
                >
                  BACKEND
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 lg:gap-6 md:mt-0">
            {/* View Doc Button */}
            <button
              className="ring-2 ring-[#F8B95A] font-playmegames rounded-md text-white h-10 lg:h-12 text-sm lg:text-xl px-4 lg:px-6 py-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-[#F8B95A] border border-[#F8B95A]"
              onClick={() => {
                window.open(getDocumentLink(), "_blank");
              }}
            >
              <GoDownload className="mr-2" /> VIEW DOC
            </button>

            {/* Submit Task Button */}
            <button
              className="ring-2 ring-[#F8B95A] font-playmegames rounded-md text-white h-10 lg:h-12 text-sm lg:text-xl px-4 lg:px-6 py-2 flex items-center justify-center hover:scale-105 transition-transform duration-300 bg-[#F8B95A] border border-[#F8B95A]"
              onClick={() => setIsModalOpen(true)}
            >
              SUBMIT TASK
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full p-4 mt-8 mb-2 border border-white rounded-3xl lg:mt-8">
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
          subdomain={initialDomain}
        />
      )}
    </div>
  );
}
