import { FaVideo, FaExclamationTriangle, FaTheaterMasks, FaCheckCircle, FaPen, FaMobileAlt, FaMagic } from "react-icons/fa";

export default function VideoTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Video Task Content - Scrollable container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaVideo className="text-2xl" /> Video Editing Task
            </h1>

            <p className="mb-4 text-white text-sm md:text-base">
              This module is designed to test both your storytelling fundamentals
              and your stylistic adaptability.
            </p>

            <div className="mb-6 p-3 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-[#F8B95A] font-bold text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                <FaExclamationTriangle /> Submission Requirement
              </h4>
              <p className="text-sm text-gray-300">
                You must submit <strong>TWO</strong> final outputs:
                <br />
                1. The mandatory task from <strong>Section 1</strong>.
                <br />
                2. <strong>One</strong> selected task from <strong>Section 2</strong>.
              </p>
            </div>

            {/* SECTION 1 - MANDATORY */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base md:text-lg font-bold text-[#F8B95A]">
                  SECTION 1: Creative Foundations
                </h3>
                <span className="text-xs font-bold bg-[#F8B95A] text-black px-2 py-1 rounded">
                  MANDATORY
                </span>
              </div>

              <h4 className="text-sm md:text-md font-bold text-white mb-2 flex items-center gap-2">
                <FaTheaterMasks className="text-[#F8B95A]" /> Task 1.1 – "Same Clip, Two Moods"
              </h4>

              <p className="text-white mb-3 text-sm md:text-base">
                <strong>Objective:</strong> Take a single source clip and produce
                two contrasting edits to demonstrate how editing shapes emotion.
              </p>

              <ul className="list-none pl-0 mb-3 text-white text-sm md:text-base space-y-3">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong>The Output:</strong> Create one short video (20–60 seconds) showing both versions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <strong>The Contrast:</strong>
                    <ul className="pl-4 mt-1 list-disc text-gray-300">
                      <li>
                        <em>Edit A:</em> Positive, calm, or uplifting.
                      </li>
                      <li>
                        <em>Edit B:</em> Tense, dramatic, or chaotic.
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong>The Tools:</strong> Alter background music, color grading, pacing, and cut duration to achieve the effect.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaPen className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Write-up:</strong> You must include a brief 3–4 line explanation describing your editing approach.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 2 - CHOICE */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-bold text-[#F8B95A]">
                  SECTION 2: Theme-Based Tasks
                </h3>
                <span className="text-xs font-bold bg-white/20 text-white px-2 py-1 rounded">
                  CHOOSE ONE
                </span>
              </div>

              {/* Option 2.1 */}
              <div className="mb-6 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h4 className="text-sm md:text-md font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                  <FaMobileAlt /> Option A: Social Media Cut
                </h4>
                <p className="text-white text-sm md:text-base mb-2">
                  Edit a video tailored for <strong>Reels/Shorts</strong>. Focus
                  on retention and platform relevance.
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base">
                  <li>Format must be <strong>Vertical (9:16)</strong>.</li>
                  <li>Must capture attention within the <strong>first 3 seconds</strong>.</li>
                  <li>Provide a clear, purposeful ending.</li>
                </ul>
              </div>

              {/* Option 2.2 */}
              <div className="pt-2">
                <h4 className="text-sm md:text-md font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                  <FaMagic /> Option B: Logo Reveal (Simple Edition)
                </h4>
                <p className="text-white text-sm md:text-base mb-2">
                  Create a refined brand animation. Prioritize subtlety over heavy
                  effects.
                </p>
                <ul className="list-disc pl-5 text-gray-300 text-sm md:text-base">
                  <li><strong>Duration:</strong> 5–7 seconds.</li>
                  <li>Avoid exaggerated transitions; keep it polished.</li>
                  <li>Must conclude on a <strong>still version</strong> of the logo.</li>
                </ul>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              Submission Guidelines
            </h2>
            <ul className="list-none pl-0 mb-4 text-white text-sm md:text-base space-y-2">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Upload your videos to <strong>Google Drive</strong> (ensure access is public).
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Include your <strong>3-4 line write-up</strong> for Section 1.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Submit the links clearly labeled (e.g., "Task 1.1" and "Task 2.1").
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}