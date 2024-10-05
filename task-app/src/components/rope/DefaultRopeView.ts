import { IRopeView } from "./Base/IRopeView";
import { IRopeOptions } from "./Base/IRopeOptions";
import { Container, Graphics, Point, SimpleRope } from "pixi.js";
import { Library, ROPE_SIGNAL } from "../../Utils";
import gsap from "gsap";
import { EventSignal } from "../signals/EventSignal";

export class DefaultRopeView implements IRopeView {
  public signal: EventSignal;

  public backFunction?: (val: { x: number; y: number }) => Point;
  protected readonly mainContainer: Container = new Container();
  private id = 0;

  private ropeOptions: IRopeOptions;
  private readonly points: Point[][] = [];
  private ropes: SimpleRope[] = [];
  private finished = 0;
  private started = 0;
  private textureId: string;

  constructor(options: IRopeOptions, textureId: string) {
    this.ropeOptions = options;
    this.textureId = textureId;

    this.signal = new EventSignal();
  }

  public startRope(points: Point[]) {
    if (this.started === this.finished) {
      this.cleanUp();
    }

    this.started++;
    const id = this.id;
    this.id++;
    this.createPoints(this.ropeOptions.lengthInPoints, id);
    this.createRope(id);
    this.createTween(points, id);
  }

  public setOptions(options: IRopeOptions) {
    this.ropeOptions = options;
  }

  public setContainer(container: Container) {
    container?.addChild(this.mainContainer);
  }

  public hideAll() {
    if (this.started) {
      for (let i = 0; i < this.ropes.length; i++) {
        this.ropes[i].alpha = 0;
      }
    }
  }

  private createPoints(N: number, id: number) {
    this.points[id] = [];
    for (let i = 0; i < N; i++) {
      this.points[id].push(new Point());
    }
  }

  private createRope(id: number) {
    const pixiRopeTexture = Library.myAssetsLibrary[this.textureId];

    const rope = new SimpleRope(pixiRopeTexture as any, this.points[id]);
    rope.blendMode = this.ropeOptions.blendMode;
    if (this.ropeOptions.tint) {
      rope.tint = this.ropeOptions.tint;
    }

    this.ropes.push(rope);
    const ropeContainer = new Container();
    ropeContainer.addChild(rope);
    this.mainContainer.addChild(ropeContainer);
  }

  private cleanUp() {
    for (let i = 0; i < this.ropes.length; i++) {
      this.ropes[i]?.destroy();
    }

    this.ropes = [];
    this.started = 0;
    this.finished = 0;
    this.id = 0;
  }

  private createTween(points: Point[], id: number) {
    const o = { value: 0 };

    const tl = gsap.timeline();
    tl.to(o, {
      duration: this.ropeOptions.duration,
      value: this.ropeOptions.numPoints + this.ropeOptions.lengthInPoints,
      ease: "Linear.easeNone",
      onUpdate: () => {
        for (let i = 0; i < this.points[id].length; ++i) {
          const ind = Math.floor(o.value) + i;
          this.points[id][i].x = points[ind].x;
          this.points[id][i].y = points[ind].y;
        }
      },
      onComplete: () => {
        this.signal.doEmmit(ROPE_SIGNAL, this.points[this.points.length - 1]);
        this.ropes[id].destroy();
        this.finished++;
        tl.kill();
      },
    });
  }
}
