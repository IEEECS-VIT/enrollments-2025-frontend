export default function BackendTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Backend Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4">
              🏢 SaaS Event Platform (Multi-Tenant)
            </h1>

            <p className="mb-4 text-white text-sm md:text-base">
              Welcome to the backend engineering challenge! 🚀 Your goal is to
              build a scalable <strong>Multi-Tenant Event Management System</strong> where 
              multiple organizations can independently host and manage events on a single platform.
            </p>
            
            <p className="mb-4 text-white text-sm md:text-base">
               This task mimics real-world product evolution: starting from a simple MVP and scaling 
               to an industry-grade SaaS product with isolation, real-time features, and analytics.
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>

            {/* Level 1 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-green-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-green-400 mb-2">
                🟢 Level 1 - Core Event Management (Foundation)
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Scope:</strong> Single-tenant system. Build the foundational APIs.
              </p>

              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">
                ✅ Implementation Requirements:
              </h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  <strong>Authentication:</strong> Secure user login/signup using <strong>JWT</strong>.
                </li>
                <li className="mb-1">
                  <strong>Basic Roles:</strong> <code>Admin</code> (can manage events) and <code>User</code> (can view/register).
                </li>
                <li className="mb-1">
                  <strong>Event CRUD:</strong> Create, Read, Update, Delete events.
                </li>
                <li className="mb-1">
                  <strong>Ticket Generation:</strong> Generate a unique ticket/pass upon registration.
                </li>
                <li className="mb-1">
                  <strong>Quality Control:</strong> Implement input validation (Zod/Joi) and proper error handling.
                </li>
              </ul>
              <p className="text-xs text-green-300 mt-2 font-mono">
                Outcome: A clean REST API with solid database schema design.
              </p>
            </div>

            {/* Level 2 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-yellow-400 mb-2">
                🟡 Level 2 - System Expansion & Business Logic
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Scope:</strong> Add complex workflows and data relationships on top of Level 1.
              </p>

              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">
                ✅ Implementation Requirements:
              </h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">
                  <strong>Complex Events:</strong> Support "Fest-style" events (multiple sub-events/timelines under one umbrella).
                </li>
                <li className="mb-1">
                  <strong>Team Registration:</strong> Allow users to register as a team with constraints (e.g., min/max size).
                </li>
                <li className="mb-1">
                  <strong>Booking Constraints:</strong> Handle concurrency (prevent overbooking) using <strong>Database Transactions</strong>.
                </li>
                <li className="mb-1">
                  <strong>Announcements:</strong> Admin ability to post updates (stored in DB).
                </li>
              </ul>
              <p className="text-xs text-yellow-300 mt-2 font-mono">
                Outcome: A feature-rich backend handling real-world logical constraints.
              </p>
            </div>

            {/* Level 3 */}
            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-red-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-red-400 mb-2">
                🔴 Level 3 - Industry-Level SaaS (Advanced)
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                <strong>Scope:</strong> Transform into a <strong>Multi-Tenant</strong> system with Real-time capabilities and DevOps.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                   <h4 className="text-sm font-bold text-[#F8B95A] mb-1">🏢 Multi-Tenancy</h4>
                   <ul className="list-disc pl-4 text-xs md:text-sm text-gray-300">
                     <li>Create <strong>Organizations (Tenants)</strong>.</li>
                     <li><strong>Data Isolation:</strong> Ensure Org A cannot access Org B's data.</li>
                     <li><strong>Advanced RBAC:</strong> Org Owner, Event Manager, Attendee.</li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-[#F8B95A] mb-1">🔔 Real-Time (Sockets)</h4>
                   <ul className="list-disc pl-4 text-xs md:text-sm text-gray-300">
                     <li><strong>Live Dashboard:</strong> Real-time registration counter.</li>
                     <li><strong>Broadcasts:</strong> Push live announcements to active users.</li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-[#F8B95A] mb-1">📊 Analytics</h4>
                   <ul className="list-disc pl-4 text-xs md:text-sm text-gray-300">
                     <li>Ticket sales & revenue analytics.</li>
                     <li>Event engagement metrics.</li>
                   </ul>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-[#F8B95A] mb-1">📦 DevOps</h4>
                   <ul className="list-disc pl-4 text-xs md:text-sm text-gray-300">
                     <li><strong>Docker:</strong> Containerize the backend.</li>
                     <li><strong>Redis:</strong> Use for caching or socket scaling.</li>
                   </ul>
                </div>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Guidelines
            </h2>
            <ol className="list-decimal pl-6 mb-4 text-white text-sm md:text-base">
              <li className="mb-2">
                <strong>GitHub Repo:</strong> Push clean, well-structured code.
              </li>
              <li className="mb-2">
                <strong>API Documentation:</strong> Provide a <strong>Postman Collection</strong> (Public Link) or Swagger docs.
              </li>
              <li className="mb-2">
                <strong>README:</strong> Must include setup steps (env variables, run commands) and a brief architecture explanation.
              </li>
              <li className="mb-2">
                <strong>Video/Demo (Optional):</strong> A short loom video explaining your logic is a plus.
              </li>
            </ol>

            <p className="mt-6 mb-4 text-white text-sm md:text-base">
              Good luck! This task is designed to push your understanding of system design and scalable architecture. 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
}