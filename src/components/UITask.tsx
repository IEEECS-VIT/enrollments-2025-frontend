export default function UIUXTask() {
    return (
      <>
        <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
          {/* UI/UX Task Content - Now with scroll container */}
          <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
            <div className="markdown-content prose prose-invert max-w-none w-full px-2">
              <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
                🎨 UI/UX Task
              </h1>
  
              {/* Easy Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">🔰 Easy - 404 Error Page</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Design a <strong>404 Error Page</strong> separately for mobile & desktop.
                  </li>
                  <li className="mb-1">
                    ✅ Ensure that both versions are creative, visually engaging, and provide an optimized user experience
                  </li>
                  <li className="mb-1">
                    ✅ The design should maintain readability, usability, and responsiveness across different screen sizes. 
                  </li>
                </ul>
              </div>
  
              {/* Medium Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">⚡ Medium - Hackathon Landing Page</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Design a **landing page** for a hackathon with a **modern, engaging and user-friendly interface**.
                  </li>
                  <li className="mb-1">
                    ✅ The page should include **Timeline, FAQ, and Team Registration** sections.
                  </li>
                  <li className="mb-1">
                    ✅ Ensure a clear structure, seamless navigation, and responsive 
                    design for both desktop and mobile users.
                  </li>
                </ul>
              </div>
  
              {/* Hard Level */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
                <h3 className="text-lg font-bold text-[#F8B95A] mb-2">🚀 Hard - Rapido App Redesign</h3>
                <ul className="list-none pl-2 mb-2 text-white">
                  <li className="mb-1">
                    ✅ Redesign the **Rapido app** with a **modern & user-friendly and visually appealing** UI.
                  </li>
                  <li className="mb-1">
                    ✅ Improve **navigation, accessibility, and UX**, while maintaining its core features.
                  </li>
                  <li className="mb-1">
                    ✅ Design key screens: **Home (Ride Booking), Ride History, Pricing, and Navigation**.
                  </li>
                  <li className="mb-1">
                    ✅  Ensure a clean, intuitive, and responsive design for both mobile and tablet users.
                  </li>
                  <li className="mb-1">
                    ✅  Create a prototype to demonstrate user flow and interactions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  