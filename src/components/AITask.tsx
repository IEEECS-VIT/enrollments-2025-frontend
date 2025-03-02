export default function AITask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* ML Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="markdown-content prose prose-invert max-w-none w-full px-2">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              🤖 AI/ML Task: Image Classification Challenge
            </h1>

            <p className="mb-4 text-white">
              Welcome to the image classification challenge! 🎉 This task will
              evaluate your{" "}
              <strong>machine learning and data analysis skills</strong> while
              working with real-world image data.
            </p>

            <p className="mb-4 text-white">
              For this challenge, you'll work with the Fashion MNIST dataset
              which contains <strong>70,000 grayscale images</strong> of 28x28
              pixels each, representing{" "}
              <strong>10 categories of fashion items</strong>.
            </p>

            <p className="mb-4 text-white">
              Dataset link:{" "}
              <a
                href="https://drive.google.com/file/d/1eqMKY4yPdIFN_Fnkvp6VeEtucYT8oT3o/view?usp=sharing"
                className="text-[#F8B95A] hover:text-[#F8B95A]"
                target="_blank"
              >
                Fashion MNIST Dataset
              </a>
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-4 text-white">
              The challenge is divided into <strong>three levels</strong> of
              increasing complexity. Markdown documentation is encouraged for
              each level.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1: Exploratory Data Analysis
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Load the dataset and perform{" "}
                  <strong>exploratory data analysis (EDA)</strong>
                </li>
                <li className="mb-1">
                  ✅ Utilize libraries like{" "}
                  <strong>Pandas and Matplotlib</strong> to load and visualize
                  the dataset
                </li>
                <li className="mb-1">
                  ✅ Display <strong>sample images from each category</strong>{" "}
                  to understand the data distribution
                </li>
                <li className="mb-1">
                  ✅ Generate <strong>summary statistics</strong> for pixel
                  values to comprehend data characteristics
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Create{" "}
                  <strong>visualizations of class distributions</strong> and
                  imbalances
                </li>
                <li className="mb-1">
                  • Analyze <strong>pixel intensity patterns</strong> across
                  different classes
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2: Basic Classification Model
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Develop a{" "}
                  <strong>classifier using Logistic Regression</strong> to
                  predict the category of clothing items
                </li>
                <li className="mb-1">
                  ✅ <strong>Preprocess and normalize</strong> the data
                </li>
                <li className="mb-1">
                  ✅ Split the dataset into{" "}
                  <strong>test and training subsets</strong>
                </li>
                <li className="mb-1">
                  ✅ Implement algorithm using a{" "}
                  <strong>library of your choice</strong>
                </li>
                <li className="mb-1">
                  ✅ Train the model and evaluate{" "}
                  <strong>accuracy and loss metrics</strong>
                </li>
                <li className="mb-1">
                  ✅ Implement <strong>Explainable AI techniques</strong> to
                  interpret model decisions and feature importance
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Explore <strong>different ML algorithms</strong> (Random
                  Forest, SVM, etc.)
                </li>
                <li className="mb-1">
                  • Implement <strong>cross-validation</strong> and
                  hyperparameter tuning
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🚀 Level 3: Neural Network Implementation
              </h3>
              <ul className="list-none pl-2 mb-2 text-white">
                <li className="mb-1">
                  ✅ Construct and train a{" "}
                  <strong>simple neural network</strong> to classify images into
                  different types of clothing
                </li>
                <li className="mb-1">
                  ✅ Design a neural network architecture with{" "}
                  <strong>input, hidden, and output layers</strong>
                </li>
                <li className="mb-1">
                  ✅ Utilize <strong>appropriate activation functions</strong>
                </li>
                <li className="mb-1">
                  ✅ Train the model on the training dataset and{" "}
                  <strong>validate it on a separate validation set</strong>
                </li>
                <li className="mb-1">
                  ✅ Evaluate <strong>accuracy and loss metrics</strong>
                </li>
              </ul>
              <p className="text-sm font-bold mt-2 text-[#F8B95A]">
                💡 Extra Points:
              </p>
              <ul className="list-none pl-2 text-white">
                <li className="mb-1">
                  • Implement <strong>more advanced CNN architectures</strong>{" "}
                  (e.g., LeNet, AlexNet)
                </li>
                <li className="mb-1">
                  • Apply <strong>data augmentation techniques</strong> to
                  improve model performance
                </li>
                <li className="mb-1">
                  • Use <strong>transfer learning</strong> with pre-trained
                  models
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📍 General Guidelines
            </h2>
            <ul className="list-none pl-2 mb-4 text-white">
              <li className="mb-2">
                ✅ <strong>Code Organization:</strong> Maintain{" "}
                <strong>clean, well-documented code</strong> with appropriate
                comments
              </li>
              <li className="mb-2">
                ✅ <strong>Environment:</strong> Use{" "}
                <strong>Jupyter Notebooks or Python scripts</strong> for
                implementation
              </li>
              <li className="mb-2">
                ✅ <strong>Documentation:</strong> Include{" "}
                <strong>markdown explanations</strong> of your approach and
                findings
              </li>
              <li className="mb-2">
                ✅ <strong>Visualization:</strong> Create{" "}
                <strong>clear and informative visualizations</strong> of results
              </li>
              <li className="mb-2">
                ✅ <strong>README File:</strong> A comprehensive README.md is
                mandatory, including:
                <ul className="list-disc pl-6 mt-2 text-white">
                  <li>Project overview and goals</li>
                  <li>Data description and preprocessing steps</li>
                  <li>Models implemented and their performance</li>
                  <li>Key findings and visualizations</li>
                  <li>Installation and execution instructions</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📝 Submission Guidelines
            </h2>
            <ol className="list-decimal pl-6 mb-4 text-white">
              <li className="mb-2">
                Create a <strong>GitHub repository</strong> with your code and
                documentation
              </li>
              <li className="mb-2">
                Include <strong>all notebooks/scripts</strong> used for analysis
                and modeling
              </li>
              <li className="mb-2">
                Ensure <strong>reproducibility</strong> by including
                requirements.txt or environment.yml
              </li>
              <li className="mb-2">
                Submit your <strong>GitHub repo link</strong> and a{" "}
                <strong>brief summary</strong> of your approach
              </li>
            </ol>

            <p className="mt-6 mb-4 text-white">
              Good luck with your machine learning challenge! This task will
              help you develop skills in data analysis, visualization, and
              implementing different machine learning algorithms for image
              classification. We look forward to seeing your creative and
              technical approaches! 🧠✨
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
