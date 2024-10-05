import { Point, Texture } from "pixi.js";
import { Container } from "@pixi/display";
import { Emitter } from "@pixi/particle-emitter";
import { fire2, smoke } from "./EmitterConfig";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export type EmitterData = {
  emitter: Emitter;
  point: Point;
};

export class SimpleParticle {
  private mainContainer: Container;
  private emittersHolder: EmitterData[];
  private emitter: Emitter;
  private emitter1: Emitter;
  private emitter2: Emitter;

  private isRunning: boolean;

  private pt: Point = new Point(150, 200);
  private pt1: Point = new Point(650, 400);
  private pt2: Point = new Point(280, 270);

  constructor(container: Container) {
    this.isRunning = false;
    container.eventMode = "none"; //prevent some clash with particles

    this.emittersHolder = [];

    this.mainContainer = new Container();
    container.addChild(this.mainContainer);

    this.emitter = new Emitter(
      this.mainContainer,
      fire2(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );
    this.emittersHolder.push({ emitter: this.emitter, point: this.pt });
    this.emitter1 = new Emitter(
      this.mainContainer,
      smoke(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );
    this.emittersHolder.push({ emitter: this.emitter1, point: this.pt1 });

    this.emitter2 = new Emitter(
      this.mainContainer,
      smoke(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );
    this.emittersHolder.push({ emitter: this.emitter2, point: this.pt2 });
  }

  public setnewFire(pt: Point) {
    const emitter = new Emitter(
      this.mainContainer,
      smoke(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );

    emitter.spawnPos.copyFrom(pt);
    emitter.emit = true;
    this.emittersHolder.push({ emitter: emitter, point: pt });
  }

  public start() {
    this.isRunning = true;
    this.emitter.spawnPos.copyFrom(this.pt);
    this.emitter.emit = true;
  }

  public stop() {
    this.isRunning = false;
    this.emittersHolder.forEach((element: EmitterData) => {
      element.emitter.emit = false;
      element.emitter.particleCount = 0;
    });
  }

  public update(deltaTime: number) {
    if (!this.isRunning) return;

    this.emittersHolder.forEach((element: EmitterData) => {
      element.emitter.update(deltaTime * 0.002);
      element.emitter.spawnPos.copyFrom(element.point);
    });
  }
}
