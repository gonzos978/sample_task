import { BaseScreen } from "./BaseScreen";
import { ScreenEnum } from "../../data/ScreenEnum";
import {
  createSpriteFromId,
  fitTextToObject,
  generateRandomArray,
  getRandomColor,
  getRandomNumber,
  shuffleArray,
  signalName,
} from "../../Utils";
import { Messages } from "../../data/Messages";
import { Container, Text } from "pixi.js";

export class TaskTwoScreen extends BaseScreen {
  private messages!: Messages;
  private randomNumbers!: number[];
  private container!: Container;

  private timeInterval!: number;

  private isPlaying: boolean = false;

  constructor() {
    super();

    this.init();

    this.baseButton.y = 600 - this.baseButton.height;
  }

  private init() {
    this.container = new Container();
    this.addChild(this.container);

    this.messages = new Messages();

    this.randomNumbers = generateRandomArray(20, 0, 1);
    this.isPlaying = true;
    this.startCreation();
  }

  private startCreation() {
    if (!this.isPlaying) return;
    if (this.timeInterval) clearInterval(this.timeInterval);

    const shuffledNumbers = shuffleArray(this.randomNumbers);

    while (this.container.children.length > 0) {
      this.container.removeChildAt(0);
    }

    let posX = 0;
    let posY = 0;
    let previousNum = -1;
    let imgHeight = 0;
    for (let i = 0; i < 3; i++) {
      if (shuffledNumbers[i] === 0) {
        const img = this.getImage(getRandomNumber(1, 9));
        //if (previousNum != 0) {
        img.x = posX;
        posX += img.width + 20;
        //}
        img.y = posY;
        this.container.addChild(img);
        imgHeight = img.height;
        previousNum = shuffledNumbers[i];
      } else {
        const msg = this.messages.getMessage(
          getRandomNumber(1, this.messages.getMessageData().length - 1)
        );
        const tf = new Text(msg, {
          fontSize: getRandomNumber(25, 45),
          fill: getRandomColor(),
        });
        if (previousNum === 0) {
          posY = posY + imgHeight + 10;
        }
        tf.y = posY;
        posY += tf.height + 30;

        this.container.addChild(tf);
        previousNum = shuffledNumbers[i];

        fitTextToObject(tf, 600);
      }
    }

    this.container.x = 400 - this.container.width / 2;
    this.container.y = 300 - this.container.height / 2;

    this.timeInterval = setInterval(() => {
      this.startCreation();
    }, 3000);
  }

  private clearContainer() {}

  private getImage(imageId: number) {
    return createSpriteFromId(`e_${imageId}`);
  }

  protected override onClick(): void {
    this.isPlaying = false;
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }
}
