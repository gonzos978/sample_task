import { IRopeView } from "./IRopeView";
import { IRopeOptions } from "./IRopeOptions";
import { Point } from "pixi.js";

export abstract class BaseRopeController {
  protected readonly options: IRopeOptions;
  protected readonly view: IRopeView;
  protected readonly ropePoints: Map<string, Point[]> = new Map();
  private lsAspect = 1;
  private ptAspect = 1;

  constructor(options: IRopeOptions, view: IRopeView) {
    this.options = options;
    this.view = view;
  }

  public startRope(splinePoints: Point[], id: string) {
    /*if (this.ropePoints.has(id)) {
      const points = this.ropePoints.get(id);
      if (points !== undefined) {
        this.renderRope(points);
      }
    } else {*/

    this.renderRope(this.generatePoints(splinePoints, id));
    //}
  }

  public onResize(w: number, h: number) {
    const aspect = w / h;
    if (aspect < 1) {
      if (Math.abs(aspect - this.ptAspect) > 0.01) {
        this.resetPoints();
        this.ptAspect = aspect;
      }
    } else {
      if (Math.abs(aspect - this.lsAspect) > 0.01) {
        this.resetPoints();
        this.lsAspect = aspect;
      }
    }
  }

  protected generateBeginAndEndPoints(points: Point[]) {
    const invLength = 1 / (this.options.lengthInPoints * 10);
    const dirStartX = points[0].x - points[1].x;
    const dirStartY = points[0].y - points[1].y;
    const endPointSecond = points[points.length - 2];
    const endPointLast = points[points.length - 1];
    /*const dirEndX = endPointLast.x - endPointSecond.x;
        const dirEndY = endPointLast.y - endPointSecond.y;*/
    const dirEndX = endPointSecond.x - endPointLast.x;
    const dirEndY = endPointSecond.y - endPointLast.y;
    const beginningPoints: Point[] = [];
    for (let i = 1; i < this.options.lengthInPoints + 1; ++i) {
      const cInd = this.options.lengthInPoints - i;
      const offsetStartX = dirStartX * invLength * cInd;
      const offsetStartY = dirStartY * invLength * cInd;
      beginningPoints.push(
        new Point(points[0].x + offsetStartX, points[0].y + offsetStartY)
      );
      const offsetEndX = dirEndX * invLength * i;
      const offsetEndY = dirEndY * invLength * i;
      points.push(
        new Point(endPointLast.x + offsetEndX, endPointLast.y + offsetEndY)
      );
    }
    points = beginningPoints.concat(points);
    return points;
  }

  protected renderRope(points: Point[]) {
    this.view.startRope(points);
  }

  protected resetPoints() {
    this.ropePoints.clear();
  }

  protected abstract generatePoints(splinePoints: Point[], id: string): Point[];
}
