import { Application, Assets, Container, Text } from "pixi.js";
import { StartScreen } from "./components/StartScreen";
import { ScreenEnum } from "./components/ScreenEnum";
import { TaskOneScreen } from "./components/TaskOneScreen";

import { BaseScreen } from "./components/BaseScreen";
import { Library, signalName } from "./Utils";
import { TaskTwoScreen } from "./components/TaskTwoScreen";
import { TaskThreeScreen } from "./components/TaskThreeScreen";

(async () => {
  let gameContainer = document.getElementById("app") as HTMLElement;
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
  });

  gameContainer.appendChild(app.canvas);

  app.ticker.add(gameLoop);

  let currentScreen: BaseScreen;

  const fpsTextField = new Text({
    text: "0",
    style: { fontSize: 24, fill: 0xffffff },
  });
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

  const loadPromise = Assets.load([...taskOneAssets, ...taskTwoAssets]);
  loadPromise.then((texturesData) => {
    Library.myAssetsLibrary = texturesData;
    start();
  });

  function start() {
    currentScreen = new StartScreen();
    currentScreen.signal.on(signalName, (_data) => {
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
        currentScreen = new TaskThreeScreen();
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
