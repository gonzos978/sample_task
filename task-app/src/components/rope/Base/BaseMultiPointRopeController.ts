import { Point } from "pixi.js";
import { BaseRopeController } from "./BaseRopeController";

export class BaseMultiPointRopeController extends BaseRopeController {
  protected generatePoints(splinePoints: Point[], id: string): Point[] {
    let points = [];
    const numTotal = Math.floor(this.options.numPoints);
    const invPoints = 1 / this.options.numPoints;
    for (let i = 0; i < numTotal; ++i) {
      let ind = i * invPoints * (splinePoints.length - 2);
      ind = ind > splinePoints.length - 4 ? splinePoints.length - 4 : ind;
      const point = this.generatePoint(splinePoints, ind);
      points.push(point);
    }
    points = this.generateBeginAndEndPoints(points);
    this.ropePoints.set(id, points);
    return points;
  }

  protected generatePoint(splinePoints: Point[], i: number): Point {
    const p1Index = Math.floor(i) + 1;
    const p0 = splinePoints[p1Index - 1];
    const p1 = splinePoints[p1Index];
    const p2 = splinePoints[p1Index + 1];
    const p3 = splinePoints[p1Index + 2];

    const t = i - p1Index + 1;

    const tt = t * t;
    const ttt = tt * t;

    const q1 = -ttt + 2 * tt - t;
    const q2 = 3 * ttt - 5 * tt + 2;
    const q3 = -3 * ttt + 4 * tt + t;
    const q4 = ttt - tt;

    const x = 0.5 * (p0.x * q1 + p1.x * q2 + p2.x * q3 + p3.x * q4);
    const y = 0.5 * (p0.y * q1 + p1.y * q2 + p2.y * q3 + p3.y * q4);
    return new Point(x, y);
  }
}
