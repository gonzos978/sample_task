import { Container } from "pixi.js";
import { EventSignal } from "../signals/EventSignal";
import { IScreen } from "./IScreen";
import { Button } from "../ui/Button";

export class BaseScreen extends Container implements IScreen {
  public signal: EventSignal;
  protected baseButton!: Button;

  constructor() {
    super();

    this.signal = new EventSignal();
    this.createButton();
  }

  protected onClick(e?: any) {}

  protected createButton() {
    this.baseButton = new Button();
    this.baseButton.on("click", () => {
      this.onClick();
    });
    this.baseButton.addLabel("BACK");
    this.addChild(this.baseButton);
    this.baseButton.x = 400 - this.baseButton.width / 2;
    this.baseButton.y = 600 - this.baseButton.height * 2;
  }
  public destroy(): void {}
}
