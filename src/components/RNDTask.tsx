export default function RNDTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="w-full px-2 prose markdown-content prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              📖 Research & Development Task
            </h1>
            <p className="mb-4 text-white">
              Select one research paper from the given topics based on your
              interest. A review session will be conducted later, where you will
              be asked detailed questions to assess your understanding and
              insights on the paper.
            </p>
            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Research Paper Topics
            </h2>
            <ul className="pl-6 mb-4 text-white list-disc">
              <li className="mb-2">
                <strong>Machine Learning:</strong> Machine Learning Algorithms
              </li>
              <li className="mb-2">
                <strong>Cryptography:</strong> Cryptography
              </li>
              <li className="mb-2">
                <strong>Quantum Computing:</strong> An Introduction to Quantum
                Computing
              </li>
              <li className="mb-2">
                <strong>IoT & Robotics:</strong> The Internet of Robotic Things
              </li>
              <li className="mb-2">
                <strong>Bitcoin:</strong> Bitcoin: A Peer-to-Peer Electronic
                Cash System
              </li>
            </ul>
            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              🔍 Guidelines
            </h2>
            <ul className="pl-6 mb-4 text-white list-disc">
              <li className="mb-2">
                💡 <strong>Basic Understanding:</strong> A quick read and basic
                comprehension are sufficient.
              </li>
              <li className="mb-2">
                📝 <strong>Review Session:</strong> You will be assessed on key
                concepts and insights from the paper.
              </li>
              <li className="mb-2">
                🚫 <strong>No Submissions Required:</strong> Your understanding
                will be evaluated during the review session.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
