export default function WebTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[70vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* Backend Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[70vh]">
          <div className="markdown-content prose prose-invert max-w-none w-full px-2">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              🎭 Movie Ticket Booking  (Backend Task)
            </h1>

            <p className="mb-4 text-white">
              Welcome to the backend development challenge! 🎉 This task will
              test your ability to create a{" "}
              <strong>scalable and feature-rich backend system</strong> for
              movie ticket booking with dynamic pricing.
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              🎯 Goal
            </h2>
            <p className="mb-4 text-white">
              Build a backend system where users can book movie tickets, and
              ticket prices change dynamically based on demand and time.
            </p>
            <p className="mb-4 text-white font-bold">
              ⭐ <strong>(Required)</strong>: Postman API collections must be
              shared via a Postman group invite link for all levels that are
              implemented.
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              👤 Roles
            </h2>
            <ul className="list-none pl-2 mb-4 text-white">
              <li className="mb-2">
                🎟 <strong>User</strong> → View movies & shows, book tickets, and
                see dynamic pricing.
              </li>
              <li className="mb-2">
                🏢 <strong>Theater Owner</strong> → Manage shows, set base
                prices, and view bookings.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-4 text-white">
              The challenge is divided into <strong>three levels</strong> of
              increasing complexity.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1: Basic Backend - Movies, Shows & Bookings
              </h3>

              <h4 className="text-md font-bold text-white mb-2">
                📽 Movie & Show Management
              </h4>
              <ul className="list-none pl-2 mb-3 text-white">
                <li className="mb-1">
                  ✅ Implement a system to{" "}
                  <strong>add and retrieve movies</strong>
                </li>
                <li className="mb-1">
                  ✅ Allow theater owners to{" "}
                  <strong>add and manage shows</strong>, including seat
                  availability
                </li>
                <li className="mb-1">
                  ✅ Users should be able to{" "}
                  <strong>view details of available shows</strong>
                </li>
              </ul>

              <h4 className="text-md font-bold text-white mb-2">
                🎟 Ticket Booking
              </h4>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Users should be able to{" "}
                  <strong>book seats for a show</strong>
                </li>
                <li className="mb-1">
                  ✅ They should also be able to{" "}
                  <strong>view their past bookings</strong>
                </li>
              </ul>

              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Implement <strong>filtering and searching</strong> for
                  movies and shows
                </li>
                <li className="mb-1">
                  • Add <strong>basic email notifications</strong> for booking
                  confirmations
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2: Dynamic Pricing & Role-Based Access
              </h3>

              <h4 className="text-md font-bold text-white mb-2">
                📊 Dynamic Pricing Rules
              </h4>
              <p className="mb-2 text-white">
                Implement price variations based on different factors:
              </p>
              <ul className="list-none pl-2 mb-3 text-white">
                <li className="mb-1">
                  ✅ If <strong>70%+ seats are booked</strong>, increase the
                  price by 30%
                </li>
                <li className="mb-1">
                  ✅ If booking is <strong>within 3 hours of the show</strong>,
                  increase the price by 20%
                </li>
                <li className="mb-1">
                  ✅ If demand is low, apply a <strong>discount</strong>
                </li>
                <li className="mb-1">
                  ✅ <strong>Peak hours (7 PM - 10 PM)</strong> should have
                  higher base prices
                </li>
                <li className="mb-1">
                  ✅ A separate <strong>simulation endpoint</strong> should be
                  created, where given parameters like seats booked, time left,
                  active users, and showtime, the system calculates the ticket
                  price dynamically
                </li>
              </ul>

              <h4 className="text-md font-bold text-white mb-2">
                👥 Role-Based Access
              </h4>
              <p className="mb-2 text-white">
                Theater Owners should be able to:
              </p>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ <strong>Add or update show details</strong>
                </li>
                <li className="mb-1">
                  ✅ <strong>Set base ticket prices</strong>
                </li>
                <li className="mb-1">
                  ✅ <strong>View all bookings</strong> for their theater
                </li>
              </ul>

              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Add <strong>analytics dashboard</strong> for theater owners
                </li>
                <li className="mb-1">
                  • Implement <strong>custom pricing rules</strong> that can be
                  set by theater owners
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🚀 Level 3: Payments, Booking Expiry & Advanced Features
              </h3>

              <h4 className="text-md font-bold text-white mb-2">
                💳 Payment & Release/Hold System
              </h4>
              <ul className="list-none pl-2 mb-3 text-white">
                <li className="mb-1">
                  ✅ When a user starts booking, seats should be{" "}
                  <strong>reserved for 10 minutes</strong>
                </li>
                <li className="mb-1">
                  ✅ If payment is not completed within 10 minutes, the{" "}
                  <strong>seats should be released</strong> for others
                </li>
                <li className="mb-1">
                  ✅ Use <strong>Redis or a database flag</strong> to handle
                  seat locking and ensure race conditions don't occur
                </li>
                <li className="mb-1">
                  ✅ Implement an <strong>end-to-end payment flow</strong>,
                  including:
                  <ul className="list-circle pl-6 mt-1 space-y-1 text-white">
                    <li>• Initiating payments</li>
                    <li>• Handling payment success & failure via a webhook</li>
                  </ul>
                </li>
              </ul>

              <h4 className="text-md font-bold text-white mb-2">
                🐳 Docker Requirement
              </h4>
              <p className="mb-2 text-white">
                The project should be dockerized, with:
              </p>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ A <strong>Dockerfile</strong> defining dependencies and
                  environment setup
                </li>
                <li className="mb-1">
                  ✅ A <strong>docker-compose.yml</strong> to handle the
                  backend, database, and Redis setup
                </li>
                <li className="mb-1">
                  ✅ The project should be pushed to GitHub, where it can be{" "}
                  <strong>cloned and tested using Docker</strong>
                </li>
              </ul>

              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Implement <strong>logging and monitoring</strong> solutions
                </li>
                <li className="mb-1">
                  • Add <strong>automated testing</strong> with good code
                  coverage
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🌐 Frontend Integration (Optional for All Levels)
              </h3>
              <p className="mb-2 text-white">
                Frontend implementation is optional for all levels. If you
                choose to implement a frontend:
              </p>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ <strong>Level 1:</strong> Basic UI to display movies,
                  shows, and a simple booking interface
                </li>
                <li className="mb-1">
                  ✅ <strong>Level 2:</strong> Add dynamic pricing visualization
                  and role-based interfaces
                </li>
                <li className="mb-1">
                  ✅ <strong>Level 3:</strong> Include seat layouts, real-time
                  pricing updates, payment flow integration, and a theater owner
                  dashboard
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📍 General Guidelines
            </h2>
            <ul className="list-none pl-2 mb-4 text-white">
              <li className="mb-2">
                ✅ <strong>Database Schema Design</strong> is up to the
                candidates. They should create tables/collections as needed.
              </li>
              <li className="mb-2">
                ✅ <strong>Authentication</strong> is expected for Theater
                Owners (JWT-based or any secure method).
              </li>
              <li className="mb-2">
                ✅ <strong>Rate limiting & basic security measures</strong>{" "}
                (e.g., input validation) will be considered a plus.
              </li>
              <li className="mb-2">
                ✅ The primary focus is on{" "}
                <strong>backend functionality</strong>, with frontend being
                completely optional.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Guidelines
            </h2>
            <ol className="list-decimal pl-6 mb-4 text-white">
              <li className="mb-2">
                Push your code to a <strong>GitHub repository</strong> with
                clear instructions in the README
              </li>
              <li className="mb-2">
                Share <strong>Postman API collections</strong> via a Postman
                group invite link
              </li>
              <li className="mb-2">
                Ensure <strong>Docker setup</strong> works correctly and
                includes all required services
              </li>
              <li className="mb-2">
                Include <strong>documentation</strong> on the API endpoints,
                database schema, and any special features
              </li>
            </ol>

            <p className="mt-6 mb-4 text-white">
              Good luck with your backend development challenge! This task will
              help you demonstrate your skills in creating scalable, secure, and
              feature-rich backend systems. We're excited to see your
              implementation! 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
