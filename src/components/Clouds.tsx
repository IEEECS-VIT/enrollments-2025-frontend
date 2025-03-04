import { motion } from "framer-motion";
import CloudImage from "/cloud.svg"; 

export default function Treecloud() {
  return (
    <div className="relative min-h-screen min-w-screen overflow-hidden">
      <div className="absolute inset-0">
      <motion.img
      src={CloudImage}
      alt="Cloud"
      className="absolute top-[12.5vh] left-0 w-40 h-16 opacity-80"
      animate={{ x: ["-100%", "1000%"] }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "linear",
      }}
    />
        <motion.img
      src={CloudImage}
      alt="Cloud"
      className="absolute top-[30.5vh] left-0 w-40 h-16 opacity-80"
      animate={{ x: ["1000%", "-100%"] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
        <motion.img
      src={CloudImage}
      alt="Cloud"
      className="absolute top-[45.5vh] left-0 w-40 h-16 opacity-80"
      animate={{ x: ["-500%", "1000%"] }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    />
      </div>
    </div>
  );
}
