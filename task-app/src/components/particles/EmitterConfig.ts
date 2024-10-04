import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { Texture } from "pixi.js";

export function explosion(texture: Texture): EmitterConfigV3 {
  const config = {
    lifetime: {
      min: 0.5,
      max: 0.5,
    },
    particlesPerWave: 10,
    frequency: 0.1,
    emitterLifetime: 0.31,
    maxParticles: 1000,
    addAtBack: false,
    pos: {
      x: 0,
      y: 0,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 0.8,
              },
              {
                time: 1,
                value: 0.1,
              },
            ],
          },
        },
      },
      {
        type: "moveSpeedStatic",
        config: {
          min: 200,
          max: 200,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.3,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              {
                time: 0,
                value: "fd1111",
              },
              {
                time: 1,
                value: "f7a134",
              },
            ],
          },
        },
      },
      {
        type: "textureRandom",
        config: {
          textures: [texture],
        },
      },
      {
        type: "spawnBurst",
        config: {
          start: 0,
          spacing: 0,
          distance: 0,
        },
      },
    ],
  };

  return config;
}

export function getFireEmitterConfig(texture: Texture) {
  const f = {
    lifetime: {
      min: 0.1,
      max: 0.8,
    },
    frequency: 0.005, // How frequently particles are emitted
    emitterLifetime: -1, // Looping particles
    maxParticles: 100,
    addAtBack: false,
    pos: {
      x: 400,
      y: 300,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              { time: 0, value: 1 },
              { time: 1, value: 0 },
            ],
          },
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              { time: 0, value: 0.5 },
              { time: 1, value: 1 },
            ],
            isStepped: false,
          },
          minMult: 1,
        },
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              { time: 0, value: "ff9933" }, // Bright orange
              { time: 0.5, value: "ff6600" }, // Darker orange
              { time: 1, value: "660000" }, // Dark red (as it fades out)
            ],
          },
        },
      },
      {
        type: "moveSpeed",
        config: {
          speed: {
            list: [
              { time: 0, value: 200 }, // Initial speed
              { time: 1, value: 50 }, // Slow down as it fades out
            ],
            isStepped: false,
          },
        },
      },
      {
        type: "acceleration",
        config: {
          accel: {
            x: 0,
            y: -200, // Simulate the particles rising upward
          },
          minStart: 0,
          maxStart: 0,
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 50,
          maxSpeed: 50, // Rotate particles randomly
          minStart: 265,
          maxStart: 275,
        },
      },
      {
        type: "textureRandom",
        config: {
          textures: [texture],
        },
      },
    ],
  };

  return f;
}

export function fire2(texture: Texture, texture1: Texture) {
  const f = {
    lifetime: {
      min: 0.1,
      max: 0.75,
    },
    frequency: 0.001, // How frequently particles are emitted
    emitterLifetime: 0, // Looping particles
    maxParticles: 1000,
    addAtBack: false,
    pos: {
      x: 400,
      y: 300,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              { time: 0, value: 0.62 },
              { time: 1, value: 0 },
            ],
          },
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              { time: 0, value: 0.25 },
              { time: 1, value: 0.75 },
            ],
            isStepped: false,
          },
          minMult: 1,
        },
      },
      {
        type: "moveSpeedStatic",
        config: {
          min: 500,
          max: 500,
        },
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              { time: 0, value: "fff191" }, // Bright orange
              { time: 1, value: "ff622c" }, // Dark red (as it fades out)
            ],
          },
        },
      },
      {
        type: "moveSpeed",
        config: {
          speed: {
            list: [
              { time: 0, value: 200 }, // Initial speed
              { time: 1, value: 50 }, // Slow down as it fades out
            ],
            isStepped: false,
          },
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 50,
          maxSpeed: 50, // Rotate particles randomly
          minStart: 265,
          maxStart: 275,
        },
      },
      {
        type: "textureRandom",
        config: {
          textures: [texture, texture1],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 0,
            y: 0,
            radius: 10,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };

  return f;
}

export function smoke(texture: Texture, texture1: Texture) {
  const smoke = {
    lifetime: {
      min: 0.5,
      max: 0.7,
    },
    frequency: 0.001,
    emitterLifetime: 0,
    maxParticles: 1000,
    addAtBack: false,
    pos: {
      x: 0,
      y: 0,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                value: 0.62,
                time: 0,
              },
              {
                value: 0,
                time: 0.6,
              },
              {
                value: 0,
                time: 0.7,
              },
              {
                value: 0.8,
                time: 0.71,
              },
              {
                value: 0,
                time: 1,
              },
            ],
            isStepped: false,
          },
        },
      },
      {
        type: "moveSpeed",
        config: {
          speed: {
            list: [
              {
                value: 500,
                time: 0,
              },
              {
                value: 450,
                time: 0.7,
              },
              {
                value: 450,
                time: 1,
              },
            ],
            isStepped: true,
          },
          minMult: 1,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                value: 0.25,
                time: 0,
              },
              {
                value: 0.35,
                time: 1,
              },
            ],
            isStepped: false,
          },
          minMult: 1,
        },
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              {
                value: "fff191",
                time: 0,
              },
              {
                value: "ff622c",
                time: 0.3,
              },
              {
                value: "111111",
                time: 0.4,
              },
              {
                value: "333333",
                time: 1,
              },
            ],
            isStepped: false,
          },
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 50,
          maxSpeed: 50,
          minStart: 265,
          maxStart: 275,
        },
      },
      {
        type: "textureRandom",
        config: {
          textures: [texture, texture1],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 0,
            y: 0,
            radius: 5,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };

  return smoke;
}
