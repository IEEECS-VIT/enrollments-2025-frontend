import { FaRobot, FaExclamationTriangle, FaChartLine, FaFolderOpen, FaGraduationCap } from "react-icons/fa";

export default function AITask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* ML Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaRobot className="text-2xl" /> AI & Machine Learning Tasks
            </h1>

            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-[#F8B95A] font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <FaExclamationTriangle /> Choose Your Path
              </h4>
              <p className="text-sm text-gray-300">
                You can attempt <strong>Task 1</strong> (Data Science) OR <strong>Task 2</strong> (GenAI), or <strong>both</strong>.
                Feel free to complete as many levels as you can in your chosen track.
              </p>
            </div>

            {/* TASK 1: Customer Churn Prediction */}
            <h2 className="text-lg md:text-2xl font-bold text-[#F8B95A] mt-8 mb-4 border-b border-[#F8B95A] pb-2 flex items-center gap-2">
              <FaChartLine /> Task 1: Customer Churn Prediction
            </h2>

            <p className="mb-3 text-white text-sm md:text-base">
              <strong>Objective:</strong> Analyze customer data to predict who will leave the service.
            </p>

            <p className="mb-4 text-white text-sm md:text-base flex items-center gap-2">
              <FaFolderOpen className="text-[#F8B95A]" /> <strong>Dataset:</strong>{" "}
              <a
                href="https://drive.google.com/file/d/1mjMDsOSHlbj5A_d27vXVaVIAS46Xc1e1/view?usp=sharing"
                className="text-[#F8B95A] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Download Here
              </a>
            </p>

            <div className="space-y-4">
              {/* Level 1 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-base md:text-lg font-bold text-blue-400 mb-2">
                  Level 1: Data Understanding & EDA
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Clean & Load:</strong> Load the dataset and handle missing values.</li>
                  <li><strong>EDA:</strong> Visualize relationships between Churn and features like Tenure or Contract Type.</li>
                  <li><strong>Output:</strong> A basic feature set and visualization plots.</li>
                </ul>
              </div>

              {/* Level 2 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-base md:text-lg font-bold text-blue-400 mb-2">
                  Level 2: Classical Machine Learning
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Train:</strong> Use Logistic Regression, Random Forest, or SVM.</li>
                  <li><strong>Evaluate:</strong> Calculate Accuracy, Precision, Recall, and F1-Score.</li>
                  <li><strong>Analysis:</strong> Identify the most influential features driving churn.</li>
                </ul>
              </div>

              {/* Level 3 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-base md:text-lg font-bold text-blue-400 mb-2">
                  Level 3: Neural Networks & Advanced Modeling
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Deep Learning:</strong> Implement a Neural Network classifier.</li>
                  <li><strong>Compare:</strong> Benchmark NN performance against your classical models.</li>
                  <li><strong>Explainability:</strong> Use techniques to explain model behavior (e.g., SHAP).</li>
                </ul>
              </div>
            </div>

            {/* TASK 2: AI Campus Assistant */}
            <h2 className="text-lg md:text-2xl font-bold text-[#F8B95A] mt-12 mb-4 border-b border-[#F8B95A] pb-2 flex items-center gap-2">
              <FaGraduationCap /> Task 2: AI Campus Assistant
            </h2>

            <p className="mb-4 text-white text-sm md:text-base">
              <strong>Objective:</strong> Build an intelligent assistant to help students navigate campus life.
            </p>

            <div className="space-y-4">
              {/* Level 1 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-base md:text-lg font-bold text-purple-400 mb-2">
                  Level 1: Basic AI Assistant (Foundation)
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Goal:</strong> Simple Q&A using a pre-trained LLM.</li>
                  <li><strong>Flow:</strong> User Input → LLM → Natural Language Response.</li>
                </ul>
              </div>

              {/* Level 2 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-base md:text-lg font-bold text-purple-400 mb-2">
                  Level 2: Knowledge-Aware Assistant (RAG)
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Ingest:</strong> Process documents (FAQs, Rules, Schedules).</li>
                  <li><strong>Vector DB:</strong> Store chunks in a vector store (e.g., Chroma, Pinecone).</li>
                  <li><strong>Retrieve:</strong> Fetch relevant context based on user query before answering.</li>
                </ul>
              </div>

              {/* Level 3 */}
              <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-base md:text-lg font-bold text-purple-400 mb-2">
                  Level 3: Agentic Campus Assistant (Autonomous)
                </h3>
                <ul className="list-disc pl-5 text-sm md:text-base text-gray-300">
                  <li><strong>Agentic Behavior:</strong> Break complex goals into steps.</li>
                  <li><strong>Tools:</strong> Decide when to retrieve docs or ask follow-up questions.</li>
                  <li><strong>Memory:</strong> Maintain short-term conversational context.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}