import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
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

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", // Generates new particles on click
          },
          onHover: {
            enable: false,
          },
        },
        modes: {
          push: {
            quantity: 3, // Number of particles to add on click
          },
        },
      },
      particles: {
        color: {
          value: ["#A11414", "#2D4F97", "#D9D9D9"],
        },
        move: {
          enable: true,
          speed: 2,
          direction: MoveDirection.none,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 200,
        },
        opacity: {
          value: { min: 1, max: 1 },
        },
        shape: {
          type: ["square"],
        },
        size: {
          value: { min: 3, max: 5 },
          random: true,
        },
      },
    }),
    []
  );

  if (init) {
    return (
      <div className="absolute inset-0 z-1">
        <Particles id="tsparticles" options={options} />
      </div>
    );
  }

  return <></>;
};

export default Bg;
