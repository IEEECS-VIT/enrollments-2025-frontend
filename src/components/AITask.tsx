import { FaRobot, FaFolderOpen } from "react-icons/fa";

export default function AITask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaRobot className="text-2xl" /> AI & Machine Learning Task
            </h1>

            <h2 className="text-lg md:text-2xl font-bold text-[#F8B95A] mt-8 mb-4 border-b border-[#F8B95A] pb-2 flex items-center gap-2">
              Image Segmentation Task
            </h2>

            <p className="mb-3 text-white text-sm md:text-base">
              <strong>Objective:</strong> The purpose of this task is to correctly segment only the flooded areas in any given image. 
            </p>

            <p className="mb-3 text-white text-sm md:text-base">
              <strong>Evaluation Metric:</strong> The evaluation metric for this task will be the dice coefficient.
            </p>

            <p className="mb-4 text-white text-sm md:text-base flex items-center gap-2 mt-4">
              <FaFolderOpen className="text-[#F8B95A]" /> <strong>Dataset:</strong>{" "}
              <a
                href="https://www.kaggle.com/datasets/faizalkarim/flood-area-segmentation"
                className="text-[#F8B95A] hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Flood Area Segmentation | Kaggle
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}