import { Graphics, Container, Text } from "pixi.js";

export class Button extends Container {
  constructor(
    width: number = 100,
    height: number = 50,
    color: number = 0xcccccc
  ) {
    super();

    const rect = new Graphics()
      .roundRect(0, 0, width, height, 10)
      .fill({ color: color, alpha: 1 });

    this.addChild(rect);

    this.interactive = true;
  }

  public addLabel(value: string) {
    const tf = new Text({
      text: value,
      style: { fontSize: 24, fill: 0xffffff },
    });
    this.addChild(tf);

    this.alignTextWithContent(tf);
  }

  private alignTextWithContent(textField: Text) {
    const diffX = Math.abs(this.width - textField.width);
    const diffY = Math.abs(this.height - textField.height);
    textField.x = diffX / 2;
    textField.y = diffY / 2;
  }
}
