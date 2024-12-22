// import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Slim build for reduced bundle size
import Navbar from "./Navbar"; // Assuming Navbar exists
import Hero from "./Hero"; // Assuming Hero exists
import { useEffect, useMemo, useState } from "react";
import coin from './assets/images/coin.svg'
import magnet from './assets/images/magnet.svg'
import lightning from './assets/images/lightning.svg'

const App = () => {
  const [init, setInit] = useState(false);

  // Initialize tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the Slim build of tsParticles
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles container loaded:", container);
  };

  // Particle configuration
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Background color
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false 
          },
        },
        modes: {
          
        },
      },
      particles: {
        color: {
          value: ["#A11414", "#2D4F97", "#D9D9D9"], // Random confetti colors
        },
        move: {
          enable: true,
          speed: 2,
          direction: MoveDirection.none, // Confetti can move in multiple directions
          outModes: {
            default: OutMode.out, // Particles disappear after leaving the screen
          },
          random: true,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Spread the particles over a larger area
          },
          value: 200, // Number of particles
        },
        opacity: {
          value: {min:1,max:1}, // Make particles slightly transparent
        },
        shape: {
          type: ["square"], // Random shapes for confetti
          
        },
        size: {
          value: { min: 3, max: 5 }, // Varying confetti sizes
          random: true,
        },
      },
      detectRetina: true,
    }),
    []
  );
  
     
       

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100vh" }}>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
      )}
      <div>
        <img className="absolute left-[15vw] top-[25vh]" src={coin} alt="coin" />
        <img className="absolute left-[90vw] top-[55vh]" src={coin} alt="coin" />
        <img className="absolute left-[5vw] top-[50vh]" src={magnet} alt="magnet=" />
        <img className="absolute left-[75vw] top-[70vh]" src= {magnet} alt="magnet" />
        <img className="absolute left-[17vw] top-[70vh]" src={lightning} alt="lightning" />
        <img className="absolute left-[78vw] top-[22vh]" src={lightning} alt="lightning"/> 

      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
      </div>
    </div>
  );
};

export default App;
