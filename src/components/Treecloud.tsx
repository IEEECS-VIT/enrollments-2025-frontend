export default function Treecloud() {
  return (
      <div className="relative min-h-screen min-w-screen overflow-hidden">
          <div className="absolute inset-0">
              <img className="absolute top-0 left-0 sm:mt-[12.5vh] mt-[12vh] ml-[40vw] sm:h-[9.5vh] h-[5vh]" src="/cloud.svg" alt="Cloud Image" />
              <img className="absolute top-0 left-0 mt-[32.5vh] sm:-ml-[3vw] -ml-[6vw] sm:h-[12.5vh] h-[5vh]" src="/cloud.svg" alt="Cloud Image" />
              <img className="absolute top-0 right-0 mt-[47.5vh] sm:mr-[3vw] mr-[6vw] sm:h-[9.5vh] h-[3.5vh]" src="/cloud.svg" alt="Cloud Image" />
          </div>

          <div className="absolute inset-0 z-40 pointer-events-none">
              <img className="absolute bottom-0 left-0 h-[16vh] sm:h-[25vh] lg:h-[31.5vh]" src="/Tree.svg" alt="Tree Image" />
              <img className="absolute bottom-0 right-0 h-[16vh] sm:h-[25vh] lg:h-[31.5vh]" src="/Tree.svg" alt="Tree Image" />
          </div>
      </div>
  );
}
