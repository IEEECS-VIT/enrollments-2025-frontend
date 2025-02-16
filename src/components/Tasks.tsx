import Treecloud from "./Treecloud";
import TaskQuestions from "./TaskQuestions";

export default function Task() {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute w-full pointer-events-none z-20">
          <Treecloud />
        </div>

        <div className="absolute w-full z-10 pointer-events-auto ">
          <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start">
            <div className="border-2 border-white mt-[10vh] backdrop-blur-[4.5px] rounded-3xl w-[80%] lg:w-[70%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8">
              {/* <h2 className="text-5xl my-4 md:m-1 font-playmegames">EVENTS</h2> */}
              <TaskQuestions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
