import { FaPalette, FaExclamationTriangle, FaCircle, FaClock, FaStopCircle, FaMusic, FaPenNib } from "react-icons/fa";

export default function UIUXTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaPalette className="text-2xl" /> Design / UI/UX / Graphic Design
            </h1>

            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-[#F8B95A] font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <FaExclamationTriangle /> Submission Path
              </h4>
              <p className="text-sm text-gray-300">
                You must submit a total of <strong>2 outputs</strong>.
              </p>
              <div className="flex flex-col md:flex-row gap-2 mt-2 text-xs font-mono text-white">
                <div className="flex-1 bg-green-900/30 border border-green-500/30 p-2 rounded">
                  1. Complete SECTION 1 <br />(Mandatory)
                </div>
                <div className="flex items-center justify-center text-[#F8B95A] font-bold">+</div>
                <div className="flex-1 bg-blue-900/30 border border-blue-500/30 p-2 rounded">
                  2. Choose SECTION 2 <br /> <span className="text-gray-400">OR</span> <br /> SECTION 3
                </div>
                <div className="flex items-center justify-center text-[#F8B95A] font-bold">+</div>
                <div className="flex-1 bg-purple-900/30 border border-purple-500/30 p-2 rounded">
                  3. Pick ONE Task <br />(from chosen section)
                </div>
              </div>
            </div>

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
                This section focuses on translating abstract ideas into immersive visual experiences.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 flex items-center gap-2">
                    <FaCircle className="text-xs" /> Task 1.1 – Visualizing a Memory
                  </h4>
                  <p className="text-sm md:text-base text-gray-300 mb-2">
                    Create a design piece that transforms a memory or moment into a visual system using color, spacing, typography, rhythm, and motion. Instead of directly illustrating the event, communicate the emotional atmosphere surrounding it.
                  </p>
                  <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li>For example, nostalgia may use faded tones and layered textures, isolation may rely on empty space and muted palettes, while excitement could be represented through sharp contrast and energetic movement.</li>
                    <li><strong>References:</strong> Cinematic title sequences, interactive storytelling platforms, and emotionally driven interfaces such as Netflix, Calm, and Notion.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm md:text-md font-bold text-white mb-1 flex items-center gap-2">
                    <FaCircle className="text-xs" /> Task 1.2 – Interface Without Buttons
                  </h4>
                  <p className="text-sm md:text-base text-gray-300 mb-2">
                    Design a digital experience that communicates interaction without relying on visible buttons, menus, or navigation bars. Instead, use environmental cues such as animation, lighting, sound feedback, gesture-driven responses, or contextual transitions to guide the user.
                  </p>
                  <ul className="list-disc pl-5 text-sm md:text-base text-white">
                    <li><strong>References:</strong> Spatial computing, smart home ecosystems, and seamless interaction principles found in products like Sonos, Dyson, and Meta’s mixed reality concepts.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
              <span className="h-px bg-white/20 w-full"></span>
              <span className="px-4 text-[#F8B95A] font-bold whitespace-nowrap text-xs md:text-sm">CHOOSE ONE SECTION BELOW</span>
              <span className="h-px bg-white/20 w-full"></span>
            </div>

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
                <h4 className="text-sm md:text-md font-bold text-white mb-2 flex items-center gap-2">
                  <FaClock /> Task 2.1 – Parallel Universe Operating System
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Design a fictional operating system interface from an alternate reality where technology evolved differently.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                  <li><strong>Deliverable:</strong> Create four connected screens:
                    <ol className="list-decimal pl-5 mt-1 text-gray-400 text-sm">
                      <li>A welcome or boot-up screen introducing the world</li>
                      <li>A main experience page establishing the system’s visual language</li>
                      <li>A productivity or communication dashboard showing core interaction patterns</li>
                      <li>A system preferences/control interface reflecting the universe’s technological culture</li>
                    </ol>
                  </li>
                  <li><strong>Style:</strong> Analog computing, cyberpunk terminals, bio-organic interfaces, or speculative AI ecosystems. Reference visual languages ranging from vintage arcade systems and monochrome terminals to futuristic mixed-reality environments and adaptive holographic displays.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm md:text-md font-bold text-white mb-2 flex items-center gap-2">
                  <FaStopCircle /> Task 2.2 – An Interface That Questions the User
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Create a multi-stage interface designed to make users reconsider an impulsive or harmful decision.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                  <li><strong>Deliverable:</strong> Develop four screens:
                    <ol className="list-decimal pl-5 mt-1 text-gray-400 text-sm">
                      <li>An introduction page establishing the context and emotional stakes</li>
                      <li>An interaction page where the user begins the action</li>
                      <li>A pause or interruption stage that introduces doubt or reflection</li>
                      <li>A final outcome page revealing emotional, social, or long-term consequences</li>
                    </ol>
                  </li>
                  <li><strong>Focus:</strong> Intentional pacing, emotional design, behavioral friction, and persuasive interaction techniques. Draw inspiration from digital wellbeing systems, mindful interaction patterns, and cinematic sci-fi interface aesthetics.</li>
                </ul>
              </div>
            </div>

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
                <h4 className="text-sm md:text-md font-bold text-white mb-2 flex items-center gap-2">
                  <FaMusic /> Task 3.1 – Movie Poster for an Imaginary Film
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Design a cinematic poster for a fictional movie of your chosen genre.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                  <li>Build a visual identity that captures the tone of the story through composition, typography, texture, lighting, and symbolism.</li>
                  <li>A psychological thriller might use distorted imagery and shadow-heavy contrast, while a sci-fi drama could explore neon gradients, futuristic architecture, and atmospheric depth.</li>
                  <li><strong>References:</strong> Modern streaming platform visuals, experimental poster art, and contemporary entertainment branding.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm md:text-md font-bold text-white mb-2 flex items-center gap-2">
                  <FaPenNib /> Task 3.2 – Identity Symbol for a Fictional Company
                </h4>
                <p className="text-sm md:text-base text-gray-300 mb-2">
                  Create a visual identity mark for an imaginary brand, startup, or organization.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-white">
                  <li>The logo should communicate the company’s personality, values, and target audience through form, typography, spacing, and color psychology.</li>
                  <li><strong>Themes:</strong> Luxury minimalism, futuristic innovation, eco-conscious sustainability, or playful accessibility.</li>
                  <li><strong>References:</strong> Branding systems used by companies such as Nike, Spotify, and Airbnb while developing a distinct visual voice.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}