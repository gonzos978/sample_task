import { ScreenEnum } from "../../data/ScreenEnum";
import { BaseScreen } from "./BaseScreen";
import { createSpriteFromId, signalName } from "../../Utils";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import gsap from "gsap";

export class TaskOneScreen extends BaseScreen {
  private containerOne!: Container;
  private containerTwo!: Container;

  private stackHolderOne: Sprite[] = [];
  private stackHolderTwo: Sprite[] = [];

  private movingIndex: number = 0;
  private offsetX = 0;

  private stackInfo1!: Text;
  private stackInfo2!: Text;

  private movingInterval!: number;
  private tl!: TimelineLite;

  constructor() {
    super();
    this.init();
  }

  public override destroy(): void {
    while (this.containerOne.children.length > 0) {
      this.containerOne.removeChildAt(0);
    }
    this.containerOne.parent.removeChild(this.containerOne);
  }

  private init() {
    const placeholderOne = new Container();
    this.addChild(placeholderOne);

    const plh1 = this.createPlaceholder();
    placeholderOne.addChild(plh1);
    placeholderOne.x = 110;
    placeholderOne.y = 203;

    const placeholderTwo = new Container();
    this.addChild(placeholderTwo);

    const plh2 = this.createPlaceholder();
    placeholderTwo.addChild(plh2);
    placeholderTwo.x = 510;
    placeholderTwo.y = 203;

    this.containerOne = new Container();
    this.addChild(this.containerOne);

    this.stackHolderOne = [];
    let offsetX = 0;

    for (let i = 0; i < 144; i++) {
      const card = createSpriteFromId(`card_${i}`);
      card.x = offsetX;
      offsetX += 0.2;
      this.containerOne.addChild(card);
      this.stackHolderOne.push(card);
    }

    this.containerTwo = new Container();
    this.addChild(this.containerTwo);

    this.containerOne.x = 100;
    this.containerOne.y = 200;

    this.containerTwo.x = this.containerOne.x + 300;
    this.containerTwo.y = this.containerOne.y;

    this.stackInfo1 = new Text(this.stackHolderOne.length, {
      fontSize: 24,
      fill: 0xffffff,
    });

    this.stackInfo1.x = 150;
    this.stackInfo1.y = 100;
    this.addChild(this.stackInfo1);

    this.stackInfo2 = new Text(this.stackHolderTwo.length, {
      fontSize: 24,
      fill: 0xffffff,
    });

    this.stackInfo2.x = 550;
    this.stackInfo2.y = 100;

    this.addChild(this.stackInfo2);

    this.movingInterval = setInterval(() => {
      this.startMovingCards();
    }, 3000);
  }

  private startMovingCards() {
    if (this.stackHolderOne.length <= 0) {
      clearInterval(this.movingInterval);
      return;
    }
    const card = this.stackHolderOne.pop() as Sprite;

    this.stackInfo1.text = this.stackHolderOne.length;

    this.tl = gsap.timeline();
    this.tl.to(card, {
      duration: 2,
      x: this.containerTwo.x + 10 + this.offsetX,
      onComplete: () => {
        card.parent.setChildIndex(card, this.movingIndex);
        this.stackHolderTwo.push(card);
        this.stackInfo2.text = this.stackHolderTwo.length;
        this.movingIndex++;
        this.offsetX += 0.3;
      },
    });
  }

  protected override onClick(): void {
    clearInterval(this.movingInterval);
    if (this.tl) {
      this.tl.clear();
    }
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }

  private createPlaceholder() {
    const g = new Graphics();
    g.beginFill(0xcccccc);
    g.drawRoundedRect(0, 0, 90, 130, 10);
    g.endFill();

    return g;
  }
}
