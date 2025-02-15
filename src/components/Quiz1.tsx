import Treecloud from "./Treecloud";
import Questions from "./Question";

export default function Quiz1() {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute w-full pointer-events-none ">
          <Treecloud />
        </div>

        <div className="absolute w-full z-10 pointer-events-auto ">
          <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start">
            <Questions />
          </div>
        </div>
      </div>
    </>
  );
}
