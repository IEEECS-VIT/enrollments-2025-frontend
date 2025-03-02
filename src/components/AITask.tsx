export default function AITask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        {/* ML Task Content - With scroll container */}
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[65vh]">
          <div className="w-full px-2 prose markdown-content prose-invert max-w-none">
            <h1 className="text-2xl font-bold text-[#F8B95A] mb-4">
              🤖 AI/ML Task: Image Classification Challenge
            </h1>

            <p className="mb-4 text-white">
              Check out this dataset which contains{" "}
              <strong>70,000 grayscale images</strong> of 28x28 pixels each,
              representing <strong>10 categories of fashion items</strong>.
            </p>

            <p className="mb-4 text-white">
              <a
                href="https://drive.google.com/file/d/1byxncPUl2aeKFZ0voFAQ7WbyjBSvLhNA/view?usp=sharing"
                className="text-[#F8B95A] hover:text-[#F8B95A]"
                target="_blank"
              >
                https://drive.google.com/file/d/1byxncPUl2aeKFZ0voFAQ7WbyjBSvLhNA/view?usp=sharing
              </a>
            </p>

            <p className="mb-4 text-white">
              Use it to perform the following tasks. Markdown documentation is
              encouraged.
            </p>

            <h2 className="text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              📌 Task Levels
            </h2>
            <p className="mb-4 text-white">
              The challenge is divided into <strong>three levels</strong> of
              increasing complexity.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🔰 Level 1: Exploratory Data Analysis
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Load the dataset and perform{" "}
                  <strong>exploratory data analysis (EDA)</strong>.
                </li>
                <li className="mb-1">
                  Utilize libraries like <strong>Pandas and Matplotlib</strong>{" "}
                  to load and visualize the dataset.
                </li>
                <li className="mb-1">
                  Display <strong>sample images from each category</strong> to
                  understand the data distribution.
                </li>
                <li className="mb-1">
                  Generate <strong>summary statistics</strong> for pixel values
                  to comprehend data characteristics.
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                ⚡ Level 2: Basic Classification Model
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Develop a{" "}
                  <strong>classifier using Logistic Regression</strong> to
                  predict the category of clothing items.
                </li>
                <li className="mb-1">Preprocess and normalize the data</li>
                <li className="mb-1">
                  Split the dataset into test and training subsets
                </li>
                <li className="mb-1">
                  Implement algorithm using a library of your choice
                </li>
                <li className="mb-1">
                  Train the model and evaluate accuracy and loss metrics
                </li>
                <li className="mb-1">
                  Implement <strong>Explainable AI techniques</strong> to
                  interpret model decisions and feature importance
                </li>
              </ul>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-[#F8B95A] mb-6">
              <h3 className="text-lg font-bold text-[#F8B95A] mb-2">
                🚀 Level 3: Neural Network Implementation
              </h3>
              <ul className="pl-2 mb-2 text-white list-none">
                <li className="mb-1">
                  ✅ Construct and train a{" "}
                  <strong>simple neural network</strong> to classify images into
                  different types of clothing
                </li>
                <li className="mb-1">
                  Design a neural network architecture with{" "}
                  <strong>input, hidden, and output layers</strong>
                </li>
                <li className="mb-1">
                  Utilize <strong>appropriate activation functions</strong>
                </li>
                <li className="mb-1">
                  Train the model on the training dataset and validate it on a
                  separate validation set.
                </li>
                <li className="mb-1">Evaluate accuracy and loss metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
