import Design from './Design';
import Treecloud from './Treecloud';

export default function Domainselection() {
  return (
    <div className="relative min-h-screen items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>

      <div className="absolute w-full z-10 pointer-events-auto">
        <Design />
      </div>
    </div>
  );
}
