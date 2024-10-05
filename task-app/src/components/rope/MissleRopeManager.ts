import { BLEND_MODES, Container, Point } from "pixi.js";
import { IRopeOptions } from "./Base/IRopeOptions";
import { DefaultRopeController } from "./DefaultRopeController";
import { DefaultRopeView } from "./DefaultRopeView";
import {
  getRandomNumber,
  IMPACT_SIGNAL,
  pause,
  ROPE_SIGNAL,
} from "../../Utils";
import { IRopeView } from "./Base/IRopeView";
import { EventSignal } from "../signals/EventSignal";

export class MissleRopeManager {
  public signal: EventSignal;

  private config: IRopeOptions = {
    lengthInPoints: 50,
    blendMode: BLEND_MODES.SCREEN,
    duration: 1.5,
    numPoints: 150,
  };

  private ropeControler: DefaultRopeController;
  private ropeView: DefaultRopeView;
  private maxMissels = 10;
  private missleCounter = 0;
  private missleTime = 1650;

  constructor(container: Container) {
    this.signal = new EventSignal();

    this.ropeView = new DefaultRopeView(this.config, "trail");
    this.ropeControler = new DefaultRopeController(
      this.config,
      this.ropeView as IRopeView
    );
    this.ropeView.setContainer(container);
    this.ropeView.signal.on(ROPE_SIGNAL, (data) => {
      //console.log("foo", data[data.length - 1]);
    });

    this.createRandomPoints();
  }

  public stopTrails() {
    this.missleCounter = this.maxMissels;
  }

  private async startTrail(points: Point[]) {
    await pause(1000);

    this.ropeControler.startRope(points, "");

    await pause(3000);
    this.missleCounter++;

    this.createRandomPoints();
  }

  private async createRandomPoints() {
    if (this.missleCounter >= this.maxMissels) {
      return;
    }
    const startPt = new Point(Math.random() * 800, 0);
    const endPt = new Point(Math.random() * 800, getRandomNumber(400, 500));
    this.startTrail([startPt, new Point(endPt.x - 20, endPt.y - 20), endPt]);
    await pause(this.missleTime);
    this.signal.doEmmit(IMPACT_SIGNAL, endPt);
  }
}
