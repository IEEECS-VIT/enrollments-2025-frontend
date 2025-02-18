import FaqQuestion from "./FaqQuestion"
import Treecloud from './Treecloud';

export default function Domainselection() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="absolute w-full pointer-events-none">
                <Treecloud />
            </div>

            <div className="absolute w-full z-20 pointer-events-auto">
                <div className="text-white min-h-screen flex flex-col items-center justify-center font-press-start">
                    <div className="border-2 border-white mt-[10vh] backdrop-blur-[4.5px] rounded-3xl w-[70%] lg:w-[60%] sm:h-[65vh] h-[75vh] flex flex-col items-center p-4 md:p-8 overflow-y-auto overflow-x-hidden">
                        <h2 className="font-press-start text-[2rem] lg:hidden mb-10">FAQS</h2>
                        <FaqQuestion />
                    </div>
                </div>
            </div>
        </div>
    );
}
