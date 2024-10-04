import { Point, Texture, EventMode } from "pixi.js";
import { Container } from "@pixi/display";
import { Emitter } from "@pixi/particle-emitter";
import { explosion, fire2, smoke } from "./EmitterConfig";
import { pause } from "../../Utils";

export class SimpleParticle {
  private emitter: Emitter;
  private emitter1: Emitter;
  private emitter2: Emitter;
  private emitterExplosion!: Emitter;
  private shouldUpdateExplosion: boolean = false;

  private isRunning: boolean;

  private pt: Point = new Point(150, 200);
  private pt1: Point = new Point(650, 400);
  private pt2: Point = new Point(280, 270);

  constructor(container: Container) {
    this.isRunning = false;
    container.eventMode = "none";
    //EventMode;
    this.emitter = new Emitter(
      container,
      fire2(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );

    this.emitter1 = new Emitter(
      container,
      smoke(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );

    this.emitter2 = new Emitter(
      container,
      smoke(
        Texture.from("./assets/TaskThree/texture.png"),
        Texture.from("./assets/TaskThree/Fire.png")
      )
    );

    this.emitterExplosion = new Emitter(
      container,
      explosion(Texture.from("./assets/TaskThree/texture.png"))
    );
  }

  public start() {
    this.isRunning = true;
    this.emitter.spawnPos.copyFrom(this.pt);
    this.emitter.emit = true;
  }

  public stop() {
    this.isRunning = false;
  }

  public update(deltaTime: number) {
    if (!this.isRunning) return;

    this.emitter.update(deltaTime * 0.002);
    this.emitter.spawnPos.copyFrom(this.pt);

    this.emitter1.update(deltaTime * 0.002);
    this.emitter1.spawnPos.copyFrom(this.pt1);

    this.emitter2.update(deltaTime * 0.002);
    this.emitter2.spawnPos.copyFrom(this.pt2);
  }
}
