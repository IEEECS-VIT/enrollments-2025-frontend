import { FaShoppingBag, FaMobileAlt, FaPalette, FaCheckCircle, FaLightbulb, FaLock, FaRocket, FaClipboardList } from "react-icons/fa";

export default function AppTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* App Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaShoppingBag className="text-2xl" /> App Development Task: Shopping Application
            </h1>

            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-[#F8B95A] font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <FaMobileAlt /> Tech Stack & Platform
              </h4>
              <p className="text-sm text-gray-300">
                Candidates are free to use <strong>any mobile tech stack</strong>:
                Flutter, React Native, Kotlin Multiplatform (KMP), or Native Swift/Kotlin.
              </p>
            </div>

            <p className="mb-4 text-white text-sm md:text-base">
              Your goal is to build a scalable shopping application. The task is broken down into three levels of increasing complexity.
            </p>

            {/* Level 1 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                <FaPalette /> Level 1: Mini Shopping App (UI Only)
              </h3>
              <p className="text-white mb-2 text-sm md:text-base">
                <strong>Objective:</strong> Build the static UI and navigation flow. No backend or state logic required.
              </p>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Screens to Implement:
              </h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  <strong>Product List:</strong> Grid/List of products (Image, Name, Price). Click to navigate to details.
                </li>
                <li className="mb-1">
                  <strong>Product Detail:</strong> Large image, description, "Add to Cart" button (non-functional).
                </li>
                <li className="mb-1">
                  <strong>Cart Screen:</strong> Static list of items with a subtotal section.
                </li>
                <li className="mb-1">
                  <strong>Checkout Screen:</strong> Static order summary and basic address form.
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A] flex items-center gap-2">
                <FaLightbulb /> UI Expectations:
              </p>
              <ul className="list-none pl-2 text-gray-300 text-sm md:text-base">
                <li>• Clean typography and spacing.</li>
                <li>• Responsive layout (works on small & large screens).</li>
              </ul>
            </div>

            {/* Level 2 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                <FaLock /> Level 2: Auth & API Integration
              </h3>
              <p className="text-white mb-2 text-sm md:text-base">
                <strong>Objective:</strong> Fetch data from an external API (e.g., FakeStore API) and implement user authentication.
              </p>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Core Requirements:
              </h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  <strong>Splash Screen:</strong> Check auth state. Redirect to Login or Product List.
                </li>
                <li className="mb-1">
                  <strong>Authentication:</strong> Login/Signup via Firebase or Custom Backend (Email or Social Auth).
                </li>
                <li className="mb-1">
                  <strong>Dynamic Product List:</strong> Fetch from API. Include a <strong>Search Bar</strong> (Client or API side).
                </li>
                <li className="mb-1">
                  <strong>Cart (Local):</strong> Show items added from detail screen. Show subtotal.
                </li>
                <li className="mb-1">
                  <strong>Profile:</strong> Display user info and a <strong>Logout</strong> button.
                </li>
              </ul>
            </div>

            {/* Level 3 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-base md:text-lg font-bold text-[#F8B95A] mb-2 flex items-center gap-2">
                <FaRocket /> Level 3: Feature-Rich (Pagination & Logic)
              </h3>
              <p className="text-white mb-2 text-sm md:text-base">
                <strong>Objective:</strong> Advanced features including pagination, filtering, complex state management, and theming.
              </p>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1 flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Advanced Features:
              </h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  <strong>Pagination / Infinite Scroll:</strong> Load products in batches. Handle loading states gracefully.
                </li>
                <li className="mb-1">
                  <strong>Category Filtering:</strong> Filter product list by category. Must work with pagination.
                </li>
                <li className="mb-1">
                  <strong>Full Cart Logic:</strong> Increase/Decrease quantity, remove items, dynamic total calculation.
                </li>
                <li className="mb-1">
                  <strong>Checkout Logic:</strong> On "Place Order", clear cart and show confirmation (Toast/Success Screen).
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A] flex items-center gap-2">
                <FaLightbulb /> UI Bonus:
              </p>
              <ul className="list-none pl-2 text-gray-300 text-sm md:text-base">
                <li>• Implement a <strong>Dark Theme Toggle</strong> that works uniformly across all pages.</li>
              </ul>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3 flex items-center gap-2">
              <FaClipboardList /> Submission Guidelines
            </h2>
            <ol className="list-decimal pl-6 mb-4 text-white text-sm md:text-base">
              <li className="mb-2">
                Upload your code to <strong>GitHub (public repository)</strong>.
              </li>
              <li className="mb-2">
                Provide a <strong>Video Walkthrough</strong> or an <strong>APK/Build</strong> for testing.
              </li>
              <li className="mb-2">
                Ensure a <strong>README.md</strong> is present with setup instructions and screenshots.
              </li>
            </ol>

            <p className="mt-6 mb-4 text-white text-sm md:text-base flex items-center gap-2">
              Good luck! Focus on functional correctness, clean code, and a smooth user experience. <FaRocket />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}