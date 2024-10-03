import { Container } from "pixi.js";
import { IScreen } from "./IScreen";
import { EventSignal } from "./EventSignal";
import { Button } from "./Button";
import { ScreenEnum } from "./ScreenEnum";
import { BaseScreen } from "./BaseScreen";
import { signalName } from "../Utils";

export class StartScreen extends BaseScreen implements IScreen {
  public signal: EventSignal;
  private buttonsContainer: Container;
  private taskNames: string[];

  constructor() {
    super();

    this.signal = new EventSignal();
    this.taskNames = ["TASK 1", "TASK 2", "TASK 3"];

    this.buttonsContainer = new Container();
    this.addChild(this.buttonsContainer);
    let posY = 0;
    this.taskNames.forEach((val) => {
      const btn = new Button();
      btn.name = val;
      btn.on("click", (e) => {
        this.onClick(e);
      });
      btn.addLabel(val);
      btn.y = posY;
      posY += btn.height + 30;
      this.buttonsContainer.addChild(btn);
    });

    this.buttonsContainer.x = 400 - this.buttonsContainer.width / 2;
    this.buttonsContainer.y = 300 - this.buttonsContainer.height / 2;
  }
  protected override createButton() {}

  protected override onClick(e: any) {
    const index = this.taskNames.indexOf(e.target.name);

    if (index === 0) {
      this.signal.doEmmit(signalName, ScreenEnum.SCREEN_ONE);
    } else if (index === 0) {
      this.signal.doEmmit(signalName, ScreenEnum.SCREEN_TWO);
    } else {
      this.signal.doEmmit(signalName, ScreenEnum.SCREEN_THREE);
    }
  }
}
