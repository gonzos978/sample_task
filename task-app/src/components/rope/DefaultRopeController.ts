import { IRopeOptions } from "./Base/IRopeOptions";
import { IRopeView } from "./Base/IRopeView";
import { BaseMultiPointRopeController } from "./Base/BaseMultiPointRopeController";
import { BaseThreePointRopeController } from "./Base/BaseThreePointRopeController";
import { Point } from "pixi.js";

export class DefaultRopeController {
  private readonly options: IRopeOptions;
  private readonly view: IRopeView;
  private readonly multiPointController: BaseMultiPointRopeController;
  private readonly threePointController: BaseThreePointRopeController;

  constructor(options: IRopeOptions, view: IRopeView) {
    this.options = options;
    this.view = view;
    this.multiPointController = this.createMultiPointRopeController();
    this.threePointController = this.createThreePointRopeController();
  }

  public startRope(points: Point[], Id: string) {
    if (points.length > 3) {
      this.multiPointController.startRope(points, Id);
    } else {
      this.threePointController.startRope(points, Id);
    }
  }

  public hideAll() {
    this.view.hideAll();
  }

  public onResize(w: number, h: number) {
    this.multiPointController.onResize(w, h);
    this.threePointController.onResize(w, h);
  }

  protected createMultiPointRopeController(): BaseMultiPointRopeController {
    return new BaseMultiPointRopeController(this.options, this.view);
  }

  protected createThreePointRopeController(): BaseThreePointRopeController {
    return new BaseThreePointRopeController(this.options, this.view);
  }
}
