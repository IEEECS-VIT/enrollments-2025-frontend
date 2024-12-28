import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 

const Bg = () => {
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
          value: { min: 1, max: 1 }, // Make particles slightly transparent
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
          
      
  if (init) {
    return (
      <div className="absolute inset-0 z-10">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return <></>;
};

export default Bg;
