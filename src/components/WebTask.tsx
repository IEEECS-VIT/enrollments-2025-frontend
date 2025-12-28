import { FaRocket, FaLink, FaBullseye, FaMagic, FaWind, FaTheaterMasks, FaPaintBrush, FaMapMarkerAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";

export default function WebTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">

        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">

          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">

            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaRocket className="text-2xl" /> Frontend Task
            </h1>

            <p className="mb-4 text-white text-sm md:text-base">
              Welcome to the frontend enrollment challenge! Your mission is to
              demonstrate your design precision and coding skills by replicating a
              modern, animated landing page.
            </p>

            <p className="mb-4 text-white text-sm md:text-base">
              <strong>The Goal:</strong> Clone the following website to the best
              of your ability. There are no strict levels—we want to see how far
              you can push your skills in terms of layout, responsiveness, and
              interactivity.
            </p>

            <p className="mb-4 text-white text-sm md:text-base flex items-center gap-2">
              <FaLink className="text-[#F8B95A]" />{" "}
              <a
                href="https://companion.uprock.pro/"
                className="text-[#F8B95A] hover:text-[#F9CA81] break-all"
                target="_blank"
                rel="noreferrer"
              >
                UpRock Companion
              </a>
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaBullseye /> Scope of Work
            </h2>
            <p className="mb-3 text-white text-sm md:text-base">
              You are free to clone as much as you can within the timeframe.
              Whether you complete just the <strong>Hero Section</strong> perfectly or build
              the <strong>Entire Landing Page</strong>, we will judge based on quality over
              quantity.
            </p>
            <ul className="pl-4 md:pl-6 mb-4 text-white list-disc text-sm md:text-base">
              <li className="mb-2">
                <strong>Visual Fidelity:</strong> Try to match the fonts, colors, and spacing as closely as possible.
              </li>
              <li className="mb-2">
                <strong>Responsiveness:</strong> The site must look good on mobile, tablet, and desktop.
              </li>
              <li className="mb-2">
                <strong>Code Quality:</strong> We value clean, modular, and semantic code.
              </li>
            </ul>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                <FaMagic /> Animations & Interactions
              </h3>
              <p className="mb-3 text-white text-sm md:text-base">
                The target website features smooth reveal animations and transitions.
                To replicate this feel, we recommend exploring the following libraries:
              </p>
              <ul className="list-none pl-0 mb-2 text-white text-sm md:text-base space-y-2">
                <li className="flex items-center gap-2">
                  <FaWind className="text-blue-400" /> <strong>Framer Motion</strong> (Great for React-based animations)
                </li>
                <li className="flex items-center gap-2">
                  <FaRocket className="text-red-400" /> <strong>GSAP</strong> (Industry standard for complex timelines)
                </li>
                <li className="flex items-center gap-2">
                  <FaTheaterMasks className="text-purple-400" /> <strong>React Spring</strong> (Physics-based animations)
                </li>
                <li className="flex items-center gap-2">
                  <FaPaintBrush className="text-pink-400" /> <strong>Tailwind Animate</strong> (Simple utility-based animations)
                </li>
              </ul>
              <p className="text-xs md:text-sm mt-2 text-gray-300 italic">
                *You don't have to implement every complex 3D element, but try to capture the "feel" of the motion.*
              </p>
            </div>

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