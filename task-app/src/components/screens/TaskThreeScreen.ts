import { BaseScreen } from "./BaseScreen";
import { ScreenEnum } from "../../data/ScreenEnum";
import { IMPACT_SIGNAL, Library, pause, signalName } from "../../Utils";
import { Application, Container, Point, Sprite, Texture } from "pixi.js";
import { SimpleParticle } from "../particles/SimpleParticle";
import { MissleRopeManager } from "../rope/MissleRopeManager";

export class TaskThreeScreen extends BaseScreen {
  private mainApp: Application;
  private startFn!: () => void;
  private particle!: SimpleParticle;
  private missleManager: MissleRopeManager;
  private cratersContainer = new Container();
  private ropeContainer: Container;
  constructor(app: Application) {
    super();

    this.baseButton.y = 600 - this.baseButton.height;

    this.mainApp = app;

    const bcg = Library.myAssetsLibrary["city"];
    const sp = new Sprite(bcg);
    sp.scale.set(0.7, 0.7);
    this.addChild(sp);

    this.addChild(this.cratersContainer);

    const c = new Container();
    c.interactive = false;
    this.addChild(c);

    this.particle = new SimpleParticle(c);

    this.startLoop();

    this.ropeContainer = new Container();
    this.addChild(this.ropeContainer);
    this.missleManager = new MissleRopeManager(this.ropeContainer);
    this.missleManager.signal.on(IMPACT_SIGNAL, (data) => {
      this.setMisllePoint(data);
    });
  }

  private setMisllePoint(data: Point) {
    const crater = Sprite.from(Library.myAssetsLibrary["crater"]);
    crater.scale.set(0.5, 0.4);
    crater.anchor.set(0.5, 0.5);
    crater.x = data.x;
    crater.y = data.y;
    this.cratersContainer.addChild(crater);
    this.particle.setnewFire(data);
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

  private override destroy() {
    while (this.ropeContainer.children.length > 0) {
      this.ropeContainer.removeChildAt(0);
    }

    while (this.cratersContainer.children.length > 0) {
      this.cratersContainer.removeChildAt(0);
    }
  }
  protected override onClick(): void {
    this.mainApp.ticker.remove(this.startFn);
    this.particle.stop();
    this.missleManager.stopTrails();
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }
}
