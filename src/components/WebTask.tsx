export default function WebTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Frontend Task Content - Now with scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="w-full px-2 prose markdown-content prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              🚀 Frontend Task
            </h1>

            <p className="mb-4 text-white">
              Welcome to the frontend enrollment challenge! 🎉 This task is
              designed to <strong>evaluate your current frontend skills</strong>{" "}
              while allowing you to showcase your ability to build responsive
              and visually accurate web pages.
            </p>

            <p className="mb-4 text-white">
              Your challenge is to <strong>replicate any one page</strong>{" "}
              (including the navbar & footer) from the following website:
            </p>

            <p className="mb-4 text-white">
              🔗{" "}
              <a
                href="https://www.rocketair.com"
                className="text-[#F8B95A] hover:text-[#F9CA81]"
                target="_blank"
              >
                RocketAir
              </a>
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              Key Points:
            </h2>
            <ul className="pl-6 mb-4 text-white list-disc">
              <li className="mb-2">
                <strong>You can choose any page</strong> from the website—it
                does not have to be the landing page.
              </li>
              <li className="mb-2">
                <strong>
                  A clear and structured commit history is required.
                </strong>
              </li>
              <li className="mb-2">
                <strong>A detailed README file is mandatory</strong> (must
                include project setup, features, and implementation details).
              </li>
              <li className="mb-2">
                <strong>Bonus points for hosting the project</strong> on
                platforms like Vercel, Netlify, or GitHub Pages.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-4 text-white">
              The challenge is divided into <strong>three levels</strong>, based
              on the implementation depth. You are free to use{" "}
              <strong>any front-end tech stack</strong> of your choice.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
              👟 Level 0 - Static Component Clone
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Simple clone of navbar, footer, and one the ideas page of the website.
https://www.rocketair.com/ideas

                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="pl-2 text-white list-none">
                <li className="mb-1">
                • Responsive design

                </li>
                <li className="mb-1">
                • Try adding simple transitions using CSS when opening the navbar.
                </li>
                <li className="mb-1">
                • Simple hover effect using CSS for cards of idea page

                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1 - Navbar & Footer with Animations
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Implement the <strong>navbar & footer</strong> with smooth
                  animations (refer the website)
                </li>
                <li className="mb-1">
                  ✅ Ensure the design is <strong>responsive</strong> across
                  different screen sizes.
                </li>
                <li className="mb-1">
                  ✅ Clone <strong>any one page</strong>, maintaining the
                  correct layout & styling but{" "}
                  <strong>without animations.</strong>
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="pl-2 text-white list-none">
                <li className="mb-1">
                  • Try using <strong>animation libraries</strong> like
                  framer-motion, GSAP, AOS, etc for cleaner animations.
                </li>
                <li className="mb-1">
                  • Use{" "}
                  <strong>proper file structure and semantic HTML.</strong>
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2 - Interactive Page Clone
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Everything from <strong>Level 1</strong>
                </li>
                <li className="mb-1">
                  ✅ Add <strong>animations</strong> to elements on the page
                  (e.g., fade-ins, smooth scrolling effects)
                </li>
                <li className="mb-1">
                  ✅ Integrate a <strong>mock/dummy API</strong> to fetch &
                  display dynamic data, api can be of your choice, add a section
                  to the page and show data with clean UI.
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="pl-2 text-white list-none">
                <li className="mb-1">
                  • Optimize <strong>performance & accessibility</strong>
                </li>
                <li className="mb-1">
                  • Implement{" "}
                  <strong>
                    lazy loading for images and loading for api calls.
                  </strong>
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🚀 Level 3 - Full Page Clone with Complete Animations
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Clone <strong>any one page end-to-end</strong>, ensuring
                  all design elements, layouts, and interactions are accurately
                  replicated
                </li>
                <li className="mb-1">
                  ✅ Implement <strong>all animations & responsiveness</strong>{" "}
                  as seen on the original page
                </li>
                <li className="mb-1">
                  ✅ Apply <strong>performance optimizations</strong> (lazy
                  loading images, reducing unused CSS, etc.)
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="pl-2 text-white list-none">
                <li className="mb-1">
                  • Use <strong>advanced animations</strong> (GSAP, Framer
                  Motion, etc.)
                </li>
                <li className="mb-1">
                  • Optimize <strong>page load speed</strong> following best
                  practices
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📍 General Guidelines
            </h2>
            <ul className="pl-2 mb-4 text-white list-none">
              <li className="mb-2">
                ✅ <strong>Tech Stack:</strong> You are free to use{" "}
                <strong>any frontend technologies</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>Commit History:</strong> Maintain a{" "}
                <strong>clear and structured commit history</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>Code Readability:</strong> Follow{" "}
                <strong>clean and modular coding practices</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>Mobile-Friendly:</strong> Ensure{" "}
                <strong>responsive design</strong> across devices
              </li>
              <li className="mb-2">
                ✅ <strong>README File:</strong> A well-documented README.md is
                mandatory, including:
                <ul className="pl-6 mt-2 text-white list-disc">
                  <li>Features implemented</li>
                  <li>Tech stack used</li>
                  <li>Steps to run the project</li>
                  <li>Level completed + any additional enhancements</li>
                  <li>Hosted link (if applicable)</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Guidelines
            </h2>
            <ol className="pl-6 mb-4 text-white list-decimal">
              <li className="mb-2">
                <strong>Host the project</strong> (if possible) and share the
                live link
              </li>
              <li className="mb-2">
                Upload your code to <strong>GitHub (public repository)</strong>
              </li>
              <li className="mb-2">
                Ensure a <strong>descriptive README</strong> and{" "}
                <strong>proper commit history</strong>
              </li>
              <li className="mb-2">
                Submit your <strong>GitHub repo link & hosted site link</strong>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
