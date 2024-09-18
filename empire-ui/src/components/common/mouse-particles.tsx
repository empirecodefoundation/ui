// components/MouseParticles.tsx
"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const MouseParticles = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          zIndex: 10000,
        },
        particles: {
          number: {
            value: 0,
          },
          color: {
            value: ["#ff0000", "#00ff00", "#0000ff"],
            animation: {
              enable: true,
              speed: 180,
              sync: true,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 3,
          },
          move: {
            enable: true,
            speed: 5,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "destroy",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "trail",
            },
          },
          modes: {
            trail: {
              delay: 0.005,
              quantity: 5,
              particles: {
                size: {
                  value: 5,
                  random: {
                    enable: true,
                    minimumValue: 1,
                  },
                },
                move: {
                  speed: 5,
                  direction: "none",
                  outModes: {
                    default: "destroy",
                  },
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default MouseParticles;
