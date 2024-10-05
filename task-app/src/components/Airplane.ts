import { Container, Point, Sprite, Texture } from "pixi.js";
import { Library, pause } from "../Utils";
import gsap from "gsap";
import { Emitter } from "@pixi/particle-emitter";
import { smoke } from "./particles/EmitterConfig";

export class Airplane extends Container {
  private airplane: Sprite;
  private duration = 6;
  private rawPathData = "M-200,-10 Q750,10 900,100";
  private spawnEmitter: Emitter;
  private smokePoint = new Point(200, 200);
  private isRunning: boolean;

  constructor(container: any) {
    super();

    this.isRunning = false;

    this.airplane = Sprite.from(Library.myAssetsLibrary["airplane"]);
    this.airplane.scale.set(0.5, 0.5);
    this.airplane.anchor.set(0.5, 0.5);
    this.airplane.x = -200;
    container.addChild(this.airplane);

    this.spawnEmitter = new Emitter(
      container,
      smoke(Texture.from("./assets/TaskThree/texture.png"))
    );
    this.spawnEmitter.emit = false;
  }

  public start() {
    this.isRunning = true;
    this.fly();
  }

  public stop() {
    this.isRunning = false;
  }

  private async fly() {
    await pause(3000);
    this.spawnEmitter.emit = true;
    gsap.to(this.airplane, {
      duration: this.duration,
      motionPath: {
        path: this.rawPathData,
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
      },
      ease: "power1.inOut",
      repeat: 0,
      onUpdate: () => {
        this.smokePoint.x = this.airplane.x;
        this.smokePoint.y = this.airplane.y;
      },
    });
  }

  public update(deltaTime: number) {
    if (!this.isRunning) return;

    this.spawnEmitter.update(deltaTime * 0.002);
    this.spawnEmitter.spawnPos.copyFrom(this.smokePoint);
  }
}
