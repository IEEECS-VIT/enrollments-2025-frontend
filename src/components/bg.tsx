import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; 

const Bg = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

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
            enable: true,
            mode: "push", // Add more particles on click
          },
          onHover: {
            enable: true,
            mode: "repulse", // Push particles away on hover
          },
        },
        modes: {
          push: {
            quantity: 10, // Add more particles when clicked
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#A11414", "#2D4F97", "#D9D9D9", "#264381", "#C71F1F", "#CB2424", "#324292"], // Random confetti colors
        },
        move: {
          enable: true,
          speed: 4,
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
          polygon: {
            sides: 5, // You can add polygons like pentagons
          },
        },
        size: {
          value: { min: 3, max: 4 }, // Varying confetti sizes
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
