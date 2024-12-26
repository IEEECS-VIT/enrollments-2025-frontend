export default function Treecloud() {
    return (
        <div className="relative min-h-screen min-w-screen overflow-hidden">
            <img className="absolute top-0 left-0 sm:mt-[6.5vh] mt-[12vh] ml-[40vw] sm:h-[9.5vh] h-[5vh]" src="/cloud.svg" alt="Cloud Image" />
            <img className="absolute top-0 left-0 mt-[32.5vh] sm:-ml-[3vw] -ml-[6vw] sm:h-[12.5vh] h-[5vh]" src="/cloud.svg" alt="Cloud Image" />
            <img className="absolute top-0 left-0 mt-[47.5vh] sm:ml-[88vw] ml-[86vw] sm:h-[9.5vh] h-[3.5vh]" src="/cloud.svg" alt="Cloud Image" />
            <img className="absolute top-0 left-0 sm:mt-[64.5vh] mt-[84vh] sm:ml-[81vw] ml-[63.5vw] h-[16vh] sm:h-[34vh]" src="/Tree.svg" alt="Tree Image" />
            <img className="absolute top-0 left-0 sm:mt-[64.5vh] mt-[84vh] h-[16vh] sm:h-[35vh]" src="/Tree.svg" alt="Tree Image" />
        </div>
    );
}
