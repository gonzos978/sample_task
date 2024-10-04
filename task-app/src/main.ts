import { Application, Assets, Container, Text } from "pixi.js";
import { StartScreen } from "./components/screens/StartScreen";
import { ScreenEnum } from "./data/ScreenEnum";
import { TaskOneScreen } from "./components/screens/TaskOneScreen";

import { BaseScreen } from "./components/screens/BaseScreen";
import { Library, signalName } from "./Utils";
import { TaskTwoScreen } from "./components/screens/TaskTwoScreen";
import { TaskThreeScreen } from "./components/screens/TaskThreeScreen";
import { Viewport } from "pixi-viewport";

(async () => {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas");
  const app = new Application({
    view: canvas as HTMLCanvasElement,
    width: 800,
    height: 600,
    antialias: true,
    autoDensity: true,
    backgroundColor: 0x87ceeb,
    resolution: devicePixelRatio || 1,
  });

  const viewport = new Viewport({
    worldWidth: 800,
    worldHeight: 600,
    screenWidth: 800,
    screenHeight: 600,
    events: app.renderer.events,
  });
  app.stage.addChild(viewport);
  app.ticker.add(gameLoop);

  let currentScreen: BaseScreen;

  const fpsTextField = new Text("0", { fontSize: 24, fill: 0xffffff });
  fpsTextField.x = 10;
  fpsTextField.y = 10;
  app.stage.addChild(fpsTextField);

  //load assets
  const taskOneAssets: string[] = [];
  let i = 143;

  while (i > 0) {
    Assets.add({ alias: `card_${i}`, src: `./assets/TaskOne/${i}.png` });
    taskOneAssets.push(`card_${i}`);
    i--;
  }

  i = 9;
  const taskTwoAssets: string[] = [];
  while (i >= 1) {
    Assets.add({ alias: `e_${i}`, src: `./assets/TaskTwo/e${i}.png` });
    taskTwoAssets.push(`e_${i}`);
    i--;
  }

  Assets.add({
    alias: `waterdrop`,
    src: `./assets/TaskThree/waterdrop.png`,
  });
  taskTwoAssets.push("waterdrop");

  const loadPromise = Assets.load([...taskOneAssets, ...taskTwoAssets]);
  loadPromise.then((texturesData) => {
    Library.myAssetsLibrary = texturesData;
    start();
  });

  function start() {
    currentScreen = new StartScreen();
    currentScreen.signal.on(signalName, (_data: any) => {
      switchScreens(_data);
    });
    app.stage.addChild(currentScreen as Container);
  }

  function switchScreens(screenData: ScreenEnum) {
    currentScreen.parent.removeChild(currentScreen);

    switch (screenData) {
      case ScreenEnum.SCREEN_ONE:
        currentScreen = new TaskOneScreen();
        currentScreen.signal.on(signalName, (_data: any) => {
          switchScreens(_data);
        });
        app.stage.addChild(currentScreen);

        break;

      case ScreenEnum.SCREEN_TWO:
        currentScreen = new TaskTwoScreen();
        currentScreen.signal.on(signalName, (_data: any) => {
          switchScreens(_data);
        });
        app.stage.addChild(currentScreen);

        break;

      case ScreenEnum.SCREEN_THREE:
        currentScreen = new TaskThreeScreen(app);
        currentScreen.signal.on(signalName, (_data: any) => {
          switchScreens(_data);
        });
        app.stage.addChild(currentScreen);

        break;

      case ScreenEnum.START_SCREEN:
        currentScreen = new StartScreen();
        currentScreen.signal.on(signalName, (_data: any) => {
          switchScreens(_data);
        });
        app.stage.addChild(currentScreen);

        break;
    }
  }

  function gameLoop() {
    fpsTextField.text = "FPS: " + Math.round(app.ticker.FPS);
  }
})();
