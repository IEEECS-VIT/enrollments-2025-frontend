import Domains from "./Domains";
import Treecloud from "./Treecloud";
import UsernameForm from "./Username";

export default function UsernameSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute w-full pointer-events-none">
        <Treecloud />
      </div>

      <div className="absolute w-full z-10 pointer-events-auto">
        <UsernameForm />
      </div>
    </div>
  );
}
