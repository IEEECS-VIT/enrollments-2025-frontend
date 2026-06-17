import { FaVideo, FaTheaterMasks, FaCamera, FaCheckCircle } from "react-icons/fa";

export default function VideoTask() {
  return (
    <>
      <div className="relative w-full h-full bg-transparent max-h-[50vh] md:max-h-[65vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none">
        <div className="w-full flex justify-center items-start overflow-y-auto h-full max-h-[50vh] md:max-h-[65vh] touch-pan-y">
          <div className="w-full px-4 md:px-2 prose markdown-content prose-invert max-w-none break-words">
            <h1 className="text-xl md:text-2xl font-bold text-[#F8B95A] mb-4 flex items-center gap-3">
              <FaVideo className="text-2xl" /> Video Editing Task
            </h1>

            <p className="mb-4 text-white text-sm md:text-base">
              Please choose <strong>ONE</strong> of the following tasks and submit your video.
            </p>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                <FaTheaterMasks /> 1. Create a Cinematic Travel Montage
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-2">
                <strong>Task:</strong> Make a 30–60 second montage video using clips from a trip, your city, college, or even random phone footage.
              </p>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">Requirements</h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Use at least 5–8 clips</li>
                <li className="mb-1">Add background music</li>
                <li className="mb-1">Use simple cuts and 1–2 smooth transitions</li>
                <li className="mb-1">Sync some cuts with the beat of the music</li>
                <li className="mb-1">Add a title at the beginning</li>
                <li className="mb-1">Color adjust the clips slightly for a consistent look</li>
              </ul>
            </div>

            <div className="flex items-center justify-center mb-6">
              <span className="h-px bg-white/20 w-full"></span>
              <span className="px-4 text-[#F8B95A] font-bold whitespace-nowrap text-xs md:text-sm">OR</span>
              <span className="h-px bg-white/20 w-full"></span>
            </div>

            <div className="bg-[#232334] bg-opacity-50 p-4 rounded-lg border-l-4 border-purple-500 mb-6">
              <h3 className="text-base md:text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                <FaCamera /> 2. Edit a Talking-Head YouTube/Interview Style Video
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-2">
                <strong>Task:</strong> Record yourself (or use any raw footage) speaking for 1–2 minutes and edit it into a clean, engaging video.
              </p>
              <h4 className="text-sm md:text-md font-bold text-white mt-3 mb-1">Requirements</h4>
              <ul className="list-disc pl-5 mb-2 text-white text-sm md:text-base">
                <li className="mb-1">Remove pauses and mistakes using jump cuts</li>
                <li className="mb-1">Add subtitles/captions</li>
                <li className="mb-1">Include background music at low volume</li>
                <li className="mb-1">Add zoom-ins or simple motion effects occasionally</li>
                <li className="mb-1">Add an intro text and ending screen</li>
              </ul>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#F8B95A] mt-6 mb-3">
              Submission Guidelines
            </h2>
            <ul className="list-none pl-0 mb-4 text-white text-sm md:text-base space-y-2">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Upload your video to <strong>Google Drive</strong> (ensure access is public).
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" /> Submit the link clearly labeled with the task you chose.
              </li>
            </ul>

          </div>
        </div>
      </div>
    </>
  );
}