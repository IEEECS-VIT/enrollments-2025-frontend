export default function BackendTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4">
              🏢 Real-Time Chat Application Task
            </h1>

            <p className="mb-4 text-white text-sm md:text-base">
              <strong>Overview:</strong> Your objective is to build a robust backend for a real-time chat application. While a basic frontend is appreciated to showcase functionality, the evaluation will focus strictly on your architectural choices, API design, security, and scalability.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-green-400 mb-2">
                🟢 Level 1: The Foundation (Easy)
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Focus:</strong> User Management & RESTful API Design
              </p>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1"><strong>Authentication:</strong> Implement a secure Login and Signup system using JWT (JSON Web Tokens) or Session-based auth. Passwords must be hashed.</li>
                <li className="mb-1"><strong>User Search:</strong> Create an endpoint to search for users by their unique username.</li>
                <li className="mb-1"><strong>Friendship Logic:</strong> Implement a system to "Add Friends." (e.g., a many-to-many relationship and a friend-request flow).</li>
                <li className="mb-1"><strong>Persistence:</strong> Use a database (SQL or NoSQL) to store user profiles and friendship statuses.</li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-yellow-400 mb-2">
                🟡 Level 2: The Real-Time Shift (Medium)
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Focus:</strong> WebSockets & Event-Driven Communication
              </p>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1"><strong>One-to-One Messaging:</strong> Implement real-time messaging using WebSockets (e.g., Socket.io or Fastapi-websockets).</li>
                <li className="mb-1"><strong>Message Persistence:</strong> All chats must be saved in the database so they persist after a page refresh.</li>
                <li className="mb-1"><strong>Online/Offline Status:</strong> Show a real-time indicator of whether a friend is currently connected.</li>
                <li className="mb-1"><strong>Error Handling:</strong> Handle socket disconnections and reconnection logic gracefully.</li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-red-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-red-400 mb-2">
                🔴 Level 3: Advanced Architecture (Hard)
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Focus:</strong> Optimization, Security, and Polish
              </p>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1"><strong>Read/Unread Receipts:</strong> Track the state of messages (Sent vs. Delivered vs. Read).</li>
                <li className="mb-1"><strong>Media Support:</strong> Enable the ability to send images or files (handling file uploads and storage pointers).</li>
                <li className="mb-1"><strong>Middleware & Security:</strong> Implement Rate Limiting to prevent API abuse and Input Validation to protect against injection attacks.</li>
                <li className="mb-1"><strong>Performance:</strong> Optimize database queries for fetching chat history (e.g., pagination/indexing).</li>
              </ul>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Requirements
            </h2>
            <ul className="list-disc pl-5 mb-4 text-white text-sm md:text-base">
              <li className="mb-2"><strong>Frontend:</strong> A minimal UI (React, Vue, or even plain HTML/JS) is highly appreciated to demonstrate the features.</li>
              <li className="mb-2"><strong>Documentation:</strong> A README.md containing:
                <ul className="list-disc pl-5 mt-1">
                  <li>Instructions on how to run the project locally.</li>
                  <li>API Documentation (Postman collection or Swagger).</li>
                </ul>
              </li>
              <li className="mb-2"><strong>The Deep Dive:</strong> A section explaining your database schema choices and how you handled the real-time aspect of the application.</li>
            </ul>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              🗣️ Viva/Interview
            </h2>
            <p className="mb-4 text-white text-sm md:text-base">
              Be prepared to explain your choice of tech stack (e.g., Why Node.js vs. FastAPI? Why PostgreSQL vs. MongoDB?) and how your WebSocket implementation scales.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              🏆 Evaluation Criteria
            </h2>
            <ul className="list-disc pl-5 mb-4 text-white text-sm md:text-base">
              <li className="mb-2"><strong>Code Quality:</strong> Clean, modular, and well-commented code.</li>
              <li className="mb-2"><strong>Schema Design:</strong> How efficiently you relate users and messages.</li>
              <li className="mb-2"><strong>Security:</strong> Proper hashing, token handling, and protected routes.</li>
              <li className="mb-2"><strong>Communication:</strong> Your ability to explain the "why" behind your backend logic.</li>
            </ul>

          </div>
        </div>
      </div>
    </>
  );
}