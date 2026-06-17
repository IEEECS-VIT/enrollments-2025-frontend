import { FaRocket, FaBullseye, FaMagic, FaCheckCircle, FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";

export default function WebTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">

            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaRocket className="text-2xl" /> Frontend Task: Interactive Product Experience Platform
            </h1>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaBullseye /> Overview
            </h2>
            <p className="mb-4 text-white text-sm md:text-base">
              Build a highly interactive, state-driven web application that simulates a modern SaaS product interface. The focus is on advanced UI/UX patterns, state management, and real-time-like behavior rather than static design.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaBullseye /> Objective
            </h2>
            <p className="mb-4 text-white text-sm md:text-base">
              Move beyond static landing pages and develop an application with:
            </p>
            <ul className="pl-4 md:pl-6 mb-4 text-white list-disc text-sm md:text-base">
              <li className="mb-2">Complex state management</li>
              <li className="mb-2">Real-time UI updates</li>
              <li className="mb-2">Advanced animations and interaction patterns</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaBullseye /> Core Concept
            </h2>
            <p className="mb-4 text-white text-sm md:text-base">
              A Live Collaboration Dashboard (inspired by tools like Notion or Figma presence systems)
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-green-400 mb-2">
                Level 1 — Core UI and State
              </h3>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Multi-panel layout (sidebar, main workspace, activity panel)</li>
                <li className="mb-1">Component-based architecture</li>
                <li className="mb-1">Global state management (Zustand, Redux, or Context API)</li>
                <li className="mb-1">Theme system (dark/light mode with persistence)</li>
              </ul>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">Requirements</h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Dynamic routing (Next.js or React Router)</li>
                <li className="mb-1">Reusable UI components (buttons, cards, modals)</li>
                <li className="mb-1">Basic keyboard shortcuts</li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-yellow-400 mb-2">
                Level 2 — Advanced Interactions
              </h3>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Optimistic UI updates</li>
                <li className="mb-1">Drag-and-drop functionality (lists, cards, or modules)</li>
                <li className="mb-1">Command palette (similar to Cmd + K)</li>
                <li className="mb-1">Skeleton loaders and proper loading states</li>
              </ul>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">Animation Requirements</h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Smooth page transitions</li>
                <li className="mb-1">Layout shift animations</li>
                <li className="mb-1">Micro-interactions (hover, click feedback)</li>
              </ul>
              <p className="text-xs text-yellow-300 mt-2 font-mono">
                Recommended libraries: Framer Motion, GSAP
              </p>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-red-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-red-400 mb-2">
                Level 3 — Real-Time Experience and Polish
              </h3>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Presence indicators (mocked or socket-based)</li>
                <li className="mb-1">Live updates (polling or WebSockets)</li>
                <li className="mb-1">Undo/redo functionality (state history management)</li>
                <li className="mb-1">Basic offline support (caching or fallback states)</li>
              </ul>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaClipboardList /> Evaluation Criteria
            </h2>
            <ul className="list-none pl-0 mb-4 text-white text-sm md:text-base space-y-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span>State management and architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span>UX quality and interaction design</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span>Animation quality and correctness</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span>Code structure and reusability</span>
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaMagic /> Bonus
            </h2>
            <ul className="pl-4 md:pl-6 mb-4 text-white list-disc text-sm md:text-base">
              <li className="mb-2">Accessibility (ARIA roles, keyboard navigation)</li>
              <li className="mb-2">Performance optimization (memoization, virtualization)</li>
              <li className="mb-2">Design system documentation</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaMapMarkerAlt /> General Guidelines
            </h2>
            <ul className="list-none pl-0 mb-4 text-white text-sm md:text-base space-y-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span><strong>Tech Stack:</strong> You are free to use <strong>any frontend framework</strong> (React, Next.js, Vue, or plain HTML/CSS).</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span><strong>Asset Handling:</strong> You can inspect the website to grab SVG icons or use similar placeholders.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span><strong>Commit History:</strong> Maintain a <strong>clear and structured commit history</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1" />
                <span><strong>README File:</strong> A well-documented README.md is mandatory. Tell us what you built, what tools you used, and how to run it.</span>
              </li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaClipboardList /> Submission Guidelines
            </h2>
            <ol className="pl-4 md:pl-6 mb-4 text-white list-decimal text-sm md:text-base">
              <li className="mb-2">
                <strong>Host the project</strong> (Vercel, Netlify, GitHub Pages) and share the
                live link.
              </li>
              <li className="mb-2">
                Upload your code to a <strong>Public GitHub Repository</strong>.
              </li>
              <li className="mb-2">
                Submit both your <strong>GitHub repo link & hosted site link</strong>.
              </li>
            </ol>

            <p className="text-center text-[#F8B95A] font-bold mt-8 text-sm md:text-base flex items-center justify-center gap-2">
              Good luck! Show us what you've got. <FaRocket />
            </p>

          </div>
        </div>
      </div>
    </>
  );
}