import Design from './Design';
import Treecloud from './Treecloud';

export default function Domainselection() {
  return (
    <div className="relative min-h-screen items-center justify-center pt-[5vh]">
      <div className="absolute w-full z-20 pointer-events-none">
        <Treecloud />
      </div>

      <div className="absolute w-full z-10 pointer-events-auto">
        <Design />
      </div>
    </div>
  );
}
