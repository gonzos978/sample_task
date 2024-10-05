import { Point } from "pixi.js";
import { BaseRopeController } from "./BaseRopeController";

export class BaseThreePointRopeController extends BaseRopeController {
  protected generatePoints(splinePoints: Point[], id: string): Point[] {
    let points: Point[] = [];
    const numTotal = Math.floor(this.options.numPoints);
    const invPoints = 1 / this.options.numPoints;
    for (let i = 0; i < numTotal; ++i) {
      const ind = i * invPoints * (splinePoints.length - 2);
      const point = this.generatePoint(splinePoints, ind);
      points.push(point);
    }
    points = this.generateBeginAndEndPoints(points);
    this.ropePoints.set(id, points);
    return points;
  }

  protected generatePoint(splinePoints: Point[], i: number): Point {
    if (splinePoints.length === 3) {
      const x =
        (1 - i) ** 2 * splinePoints[0].x +
        (1 - i) * 2 * i * splinePoints[1].x +
        i * i * splinePoints[2].x;
      const y =
        (1 - i) ** 2 * splinePoints[0].y +
        (1 - i) * 2 * i * splinePoints[1].y +
        i * i * splinePoints[2].y;
      return new Point(x, y);
    }
    return new Point(0, 0);
  }
}
