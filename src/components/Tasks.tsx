import Cloud from "./Clouds";
import TaskQuestions from "./TaskQuestions";

export default function Task() {
  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="absolute w-full pointer-events-none">
          <Cloud />
        </div>

        <div className="absolute z-10 w-full pointer-events-auto ">
          <div className="flex flex-col items-center justify-center min-h-screen text-white font-press-start">
            <div className="border-2 border-white backdrop-blur-[4.5px] rounded-3xl w-[95vw] h-[90vh] flex flex-col items-center p-4 md:p-6">
              <TaskQuestions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
