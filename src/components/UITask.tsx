export default function UIUXTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* UI/UX Task Content - Scrollable container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4">
              🎨 UI/UX & Design Task
            </h1>

            {/* Submission Logic Guide */}
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-[#F8B95A] font-bold text-sm uppercase tracking-wide mb-2">
                ⚠️ Submission Path
              </h4>
              <p className="text-sm text-gray-300">
                You must submit a total of <strong>2 or 3 outputs</strong> depending on the tasks.
              </p>
              <div className="flex flex-col md:flex-row gap-2 mt-2 text-xs font-mono text-white">
                <div className="flex-1 bg-green-900/30 border border-green-500/30 p-2 rounded">
                  1. Complete SECTION 1 <br/>(Mandatory)
                </div>
                <div className="flex items-center justify-center text-[#F8B95A] font-bold">+</div>
                <div className="flex-1 bg-blue-900/30 border border-blue-500/30 p-2 rounded">
                  2. Choose SECTION 2 <br/> <span className="text-gray-400">OR</span> <br/> SECTION 3
                </div>
                <div className="flex items-center justify-center text-[#F8B95A] font-bold">+</div>
                <div className="flex-1 bg-purple-900/30 border border-purple-500/30 p-2 rounded">
                  3. Pick ONE Task <br/>(from chosen section)
                </div>
              </div>
            </div>

            {/* SECTION 1 - MANDATORY */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-xl font-bold text-[#F8B95A]">
                  SECTION 1: Creative / Conceptual
                </h3>
                <span className="text-xs font-bold bg-[#F8B95A] text-black px-2 py-1 rounded">
                  MANDATORY
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Focus: Exploring visual emotion and invisible interaction design.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm md:text-md font-bold text-white mb-1">
                    🔹 Task 1.1 – Designing an Emotion
                  </h4>
                  <p className="text-sm md:text-base text-gray-300 mb-2">
                    Develop a visual representation that translates an emotion into design through color, layout, motion, and composition.
                  </p>
                  <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li>Interpret cues like <strong>Joy</strong> (bright, dynamic), <strong>Anxiety</strong> (glitch, restricted space), or <strong>Calm</strong> (soft blues, whitespace).</li>
                    <li><strong>References:</strong> Spotify, Headspace, Apple Health.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm md:text-md font-bold text-white mb-1">
                    🔹 Task 1.2 – Invisible UI
                  </h4>
                  <p className="text-sm md:text-base text-gray-300 mb-2">
                    Create an interface where meaning is communicated via ambient behaviors (color, motion, sound) rather than buttons.
                  </p>
                  <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li>Rely on <strong>Zero-Interface principles</strong>.</li>
                    <li><strong>References:</strong> Tesla minimal dashboards, Google Nest, Apple AirPods interactions.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
                <span className="h-px bg-white/20 w-full"></span>
                <span className="px-4 text-[#F8B95A] font-bold whitespace-nowrap text-xs md:text-sm">CHOOSE ONE SECTION BELOW</span>
                <span className="h-px bg-white/20 w-full"></span>
            </div>

            {/* SECTION 2 - OPTION A */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-bold text-blue-400">
                  SECTION 2: Theme-Based UI/UX
                </h3>
                <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded">
                  OPTIONAL A
                </span>
              </div>
              <p className="text-xs text-blue-200 mb-4 italic">
                *If you choose this section, complete ONE task below.*
              </p>

              <div className="mb-6 border-b border-white/10 pb-4">
                <h4 className="text-sm md:text-md font-bold text-white mb-2">
                  🕰️ Task 2.1 – Time Travel Interface
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                    Conceptualize a UI that visually transitions across eras.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li><strong>Deliverable:</strong> 4 Screens (Landing, Hero, Dashboard, Settings).</li>
                    <li><strong>Style:</strong> From Retro 90s (Windows 95) to Speculative Future 2050 (Holographic).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm md:text-md font-bold text-white mb-2">
                  🛑 Task 2.2 – Interface That Resists
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                    Design a multi-step interface that applies intentional friction to slow down a critical action.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li><strong>Deliverable:</strong> 4 Screens (Landing/Moral, Action, Confirmation/Challenge, Reflection).</li>
                    <li><strong>Style:</strong> Ethical UX, iOS Screen Time, Futuristic HUD.</li>
                </ul>
              </div>
            </div>

            {/* SECTION 3 - OPTION B */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-purple-500 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-bold text-purple-400">
                  SECTION 3: Graphic Design
                </h3>
                <span className="text-xs font-bold bg-purple-500 text-white px-2 py-1 rounded">
                  OPTIONAL B
                </span>
              </div>
              <p className="text-xs text-purple-200 mb-4 italic">
                *If you choose this section, complete ONE task below.*
              </p>

              <div className="mb-6 border-b border-white/10 pb-4">
                <h4 className="text-sm md:text-md font-bold text-white mb-2">
                  🎵 Task 3.1 – Album Cover
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                    Craft a conceptual album artwork aligned with a specific genre.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li><strong>Styles:</strong> Abstract (Jazz), Grainy (Lo-fi), Bold (Rock).</li>
                    <li>Draw influence from futuristic music-based visual design.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm md:text-md font-bold text-white mb-2">
                  ✒️ Task 3.2 – Brand Personality Logo
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                    Develop a logo that communicates personality through shape and typography.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li><strong>Directions:</strong> Premium Elegance, Playful Character, or Geometric Precision.</li>
                    <li><strong>Ref:</strong> Apple, Duolingo, Chanel.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}