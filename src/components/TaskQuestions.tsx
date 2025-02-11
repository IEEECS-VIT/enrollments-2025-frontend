export default function TaskQuestions() {
  return (
    <div className="relative flex flex-col justify-start items-center h-full w-full font-retro-gaming px-4">
      <div id="taskBox" className="w-full max-w-[90vw] lg:max-w-[60vw] rounded-xl">
        
        <div className="text-center mb-5">
          <button
            tabIndex={0}
            className="ring-2 ring-[#F8B95A] tracking-wider rounded-md text-base sm:text-lg lg:text-xl shadow-red-glow text-white py-2 px-6 bg-[#F8B95A] bg-opacity-50 transform transition-transform duration-300"
          >
            TECHNICAL
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {["EASY", "MEDIUM", "HARD"].map((level) => (
            <button
              key={level}
              className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow text-white text-sm sm:text-base lg:text-lg px-4 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center"
            >
              {level}
            </button>
          ))}
        </div>

        <div className="border border-white rounded-3xl mt-6 w-full min-h-[100px] sm:min-h-[15vh] p-4 flex flex-col justify-center items-center">
          <textarea
            placeholder="Enter task description..."
            className="w-full h-full bg-transparent text-white outline-none border-none focus:outline-none focus:ring-0 resize-none text-sm sm:text-base"
          />
        </div>

        <div className="border border-white rounded-3xl mt-6 w-full p-4 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="GitHub Link"
            className="w-full p-2 bg-transparent text-white outline-none border-none focus:outline-none focus:ring-0 text-sm sm:text-base"
          />
        </div>

        <div className="border border-white rounded-3xl mt-6 w-full p-4 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Other Links"
            className="w-full p-2 bg-transparent text-white outline-none border-none focus:outline-none focus:ring-0 text-sm sm:text-base"
          />
        </div>
      </div>

      <button className="text-white px-4 py-1 sm:py-3 mt-6 h-[5vh] sm:h-[7.5vh] sm:mt-12 rounded-lg tracking-wide text-base sm:text-lg lg:text-xl border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 shadow-red-glow">
        &lt; SUBMIT &gt;
      </button>
    </div>
  );
}
