import { BaseScreen } from "./BaseScreen";
import { ScreenEnum } from "../../data/ScreenEnum";
import { Library, pause, signalName } from "../../Utils";
import { Application, Container, Sprite, Texture } from "pixi.js";
import { SimpleParticle } from "../particles/SimpleParticle";

export class TaskThreeScreen extends BaseScreen {
  private mainApp: Application;
  private startFn!: () => void;
  private particle!: SimpleParticle;

  constructor(app: Application) {
    super();

    this.baseButton.y = 600 - this.baseButton.height;

    this.mainApp = app;

    const bcg = Library.myAssetsLibrary["city"];
    const sp = new Sprite(bcg);
    sp.scale.set(0.7, 0.7);
    this.addChild(sp);

    const c = new Container();
    c.interactive = false;
    this.addChild(c);

    this.particle = new SimpleParticle(c);

    this.startLoop();
  }

  private async startLoop() {
    await pause(500);
    this.startFn = () => {
      this.gameLoop();
    };
    this.mainApp.ticker.add(this.startFn);
  }

  private gameLoop() {
    this.particle.update(this.mainApp.ticker.deltaTime);
    this.particle.start();
  }
  protected override onClick(): void {
    this.mainApp.ticker.remove(this.startFn);
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }
}
