export default function TaskQuestions() {
  return (
    <div className="relative font-pixeboy tracking-wide flex flex-col justify-start items-center h-full w-full px-4">
      <div id="taskBox" className="w-full max-w-[90vw] lg:max-w-[80vw] rounded-xl">
        <div className="flex flex-col items-center sm:flex-row justify-between">
          <div className="text-center  gap-x-8 flex">
            <div className="h-10 w-10 items-center justify-center flex border-2 border-white rounded-md">
                
            </div>
            <p className="text-5xl font-bold  font-playmegames tracking-widest text-[#F8B95A]">WEB</p>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            {["EASY", "MEDIUM", "HARD"].map((level) => (
              <button
                key={level}
                className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow text-white mt-2 sm:mt-0 h-12 sm:h-12 text-xl sm:text-2xl px-2 lg:px-6 py-2 border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-white rounded-3xl mt-8 sm:mt-8 w-full min-h-[100px] sm:min-h-[15vh] p-4 mb-2 flex flex-col justify-center items-center">
          <div className="relative w-full h-[80%] bg-transparent min-h-[60vh] text-white outline-none border-none focus:outline-none focus:ring-0 resize-none text-lg sm:text-3xl">
          Task Title: Development of a Dynamic Quiz Management System<br></br>
          <br></br>

Objective:
Design and implement a scalable, interactive, and user-friendly quiz management system that enables administrators to create and manage quizzes dynamically while providing users with a seamless quiz-taking experience.<br></br><br></br>

Scope:
The system should include an admin panel for quiz creation, a frontend for users to attempt quizzes, and a backend to manage quiz data. The quizzes should support multiple question types (MCQs, True/False, Short Answer) and be timed or untimed.
          </div>
        </div>
{/* 
        <div className="border border-white rounded-3xl mt-3 w-full p-4 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="GitHub Link"
            className="w-full p-2 bg-transparent text-white outline-none border-none focus:outline-none focus:ring-0 text-lg sm:text-xl"
          />
        </div>

        <div className="border border-white rounded-3xl mt-3 w-full p-4 flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Other Links"
            className="w-full p-2 bg-transparent text-white outline-none border-none focus:outline-none focus:ring-0 text-lg sm:text-xl"
          />
        </div> */}
      </div>

      {/* Responsive & Hover-Enhanced Button */}
      <div className="flex w-full justify-between px-8">
      <button className="text-white px-6 py-1  hover:scale-105 sm:hover:scale-110 hover:bg-opacity-90 transition-transform duration-300 mt-8 h-12 sm:h-[6vh] lg:h-[5vh] sm:mt-4 rounded-lg tracking-wide  text-2xl border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 shadow-red-glow">
        UPLOAD LINKS 
      </button>
      <button className="text-white px-6 py-1  hover:scale-105 sm:hover:scale-110 hover:bg-opacity-90 transition-transform duration-300 mt-8 h-12 sm:h-[6vh] lg:h-[5vh] sm:mt-4 rounded-lg tracking-wide  text-2xl border border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 shadow-red-glow">
        SUBMIT 
      </button>
      
      </div>
    </div>
  );
}
