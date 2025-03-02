export default function AppTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* App Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="markdown-content prose prose-invert max-w-none w-full px-2">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              🧮 App Development Task: Expense-Splitting Application
            </h1>

            <p className="mb-4 text-white">
              Welcome to the app development challenge! 🎉 This task is designed
              to{" "}
              <strong>assess your mobile/web development capabilities</strong>{" "}
              while giving you the opportunity to build a practical and useful
              application.
            </p>

            <p className="mb-4 text-white">
              Your challenge is to create an{" "}
              <strong>expense-splitting app</strong> similar to Settle Up or
              Splitwise that allows users to track and manage shared expenses
              effectively.
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              Key Points:
            </h2>
            <ul className="list-disc pl-6 mb-4 text-white">
              <li className="mb-2">
                <strong>Functional Core:</strong> The app must accurately
                calculate and track who owes what to whom.
              </li>
              <li className="mb-2">
                <strong>
                  Clean and structured code organization is required.
                </strong>
              </li>
              <li className="mb-2">
                <strong>A comprehensive README file is mandatory</strong> (must
                include setup instructions, features, and implementation
                details).
              </li>
              <li className="mb-2">
                <strong>Bonus points for deploying the application</strong> on
                platforms like Vercel, Netlify, Firebase Hosting, or app stores.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-4 text-white">
              The challenge is divided into <strong>four levels</strong> of
              increasing complexity. You are free to use{" "}
              <strong>any tech stack</strong> of your choice for development.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1: Basic UI Development (Static)
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Design the <strong>basic UI</strong> of the app
                </li>
                <li className="mb-1">
                  ✅ Include screens for{" "}
                  <strong>
                    adding expenses, viewing balances, and settling payments
                  </strong>
                </li>
                <li className="mb-1">
                  ✅ Focus on{" "}
                  <strong>layout, navigation, and UI components</strong> without
                  implementing any backend logic
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Implement <strong>smooth transitions</strong> between
                  screens
                </li>
                <li className="mb-1">
                  • Create a <strong>visually appealing and intuitive</strong>{" "}
                  interface
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2: Functional App with API Integration
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Everything from <strong>Level 1</strong>
                </li>
                <li className="mb-1">
                  ✅ Make the UI <strong>fully responsive</strong> for different
                  screen sizes
                </li>
                <li className="mb-1">
                  ✅ Implement core functionality including{" "}
                  <strong>adding and splitting expenses</strong> among multiple
                  users
                </li>
                <li className="mb-1">
                  ✅ Calculate <strong>who owes how much to whom</strong> with
                  proper debt simplification
                </li>
                <li className="mb-1">
                  ✅ Integrate a{" "}
                  <strong>public API for currency conversion</strong>, allowing
                  expenses in different currencies
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Add{" "}
                  <strong>expense categories and filtering options</strong>
                </li>
                <li className="mb-1">
                  • Include <strong>data visualization</strong> for expense
                  breakdown
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🚀 Level 3: Backend Integration & Data Storage
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Everything from <strong>Level 2</strong>
                </li>
                <li className="mb-1">
                  ✅ Use <strong>Firebase or another backend service</strong> to
                  store user data, expenses, and balances
                </li>
                <li className="mb-1">
                  ✅ Implement <strong>user authentication</strong> (Google
                  sign-in, email/password, etc.)
                </li>
                <li className="mb-1">
                  ✅ Display data in a <strong>well-structured way</strong> and
                  ensure real-time updates
                </li>
                <li className="mb-1">
                  ✅ Implement{" "}
                  <strong>local storage for offline support</strong>
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Add <strong>user profile management</strong> with avatars
                  and settings
                </li>
                <li className="mb-1">
                  • Implement <strong>push notifications</strong> for new
                  expenses and reminders
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                💯 Level 4: OCR for Automated Expense Entry
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Everything from <strong>Level 3</strong>
                </li>
                <li className="mb-1">
                  ✅ Integrate{" "}
                  <strong>OCR (Optical Character Recognition)</strong> to scan
                  bills and extract text automatically
                </li>
                <li className="mb-1">
                  ✅ Allow users to <strong>capture receipts</strong> and
                  auto-fill expense details like amount, date, and category
                </li>
                <li className="mb-1">
                  ✅ Optimize OCR to{" "}
                  <strong>
                    handle different receipt formats and currencies
                  </strong>
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Implement <strong>machine learning</strong> to improve OCR
                  accuracy over time
                </li>
                <li className="mb-1">
                  • Add{" "}
                  <strong>receipt organization and search features</strong>
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📍 General Guidelines
            </h2>
            <ul className="list-none pl-2 mb-4 text-white">
              <li className="mb-2">
                ✅ <strong>Tech Stack:</strong> You may use{" "}
                <strong>any frontend and backend technologies</strong> of your
                choice
              </li>
              <li className="mb-2">
                ✅ <strong>Code Quality:</strong> Maintain{" "}
                <strong>clean, modular, and well-documented code</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>Version Control:</strong> Use{" "}
                <strong>Git with meaningful commit messages</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>Responsive Design:</strong> Ensure the app works well
                on <strong>multiple device types and screen sizes</strong>
              </li>
              <li className="mb-2">
                ✅ <strong>README File:</strong> A comprehensive README.md is
                mandatory, including:
                <ul className="list-disc pl-6 mt-2 text-white">
                  <li>Features implemented</li>
                  <li>Tech stack used</li>
                  <li>Installation and setup instructions</li>
                  <li>Level completed + any additional features</li>
                  <li>Deployment link (if applicable)</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Guidelines
            </h2>
            <ol className="list-decimal pl-6 mb-4 text-white">
              <li className="mb-2">
                <strong>Deploy your application</strong> (if possible) and share
                the live link
              </li>
              <li className="mb-2">
                Upload your code to <strong>GitHub (public repository)</strong>
              </li>
              <li className="mb-2">
                Ensure a <strong>detailed README</strong> with clear setup
                instructions
              </li>
              <li className="mb-2">
                Submit your{" "}
                <strong>GitHub repo link & deployed app link</strong>
              </li>
            </ol>

            <p className="mt-6 mb-4 text-white">
              Good luck with your development challenge! Remember that the goal
              is to demonstrate your skills in creating a functional,
              user-friendly application that solves a real-world problem. We're
              excited to see what you'll build! 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
