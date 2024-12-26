import Domains from './Domains';
import Treecloud from './Treecloud';

export default function Domainselection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-[10.5vh]">
      <div className="absolute w-full z-20 pointer-events-none">
        <Treecloud />
      </div>

      <div className="absolute w-full z-10 pointer-events-auto">
        <Domains />
      </div>
    </div>
  );
}
