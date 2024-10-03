import { Application, Assets, Container, Text } from "pixi.js";
import { StartScreen } from "./components/StartScreen";
import { ScreenEnum } from "./components/ScreenEnum";
import { TaskOneScreen } from "./components/TaskOneScreen";
import { BaseScreen } from "./components/BaseScreen";
import { Library, signalName } from "./Utils";

export namespace MainApp {
  export var app: any;
}

(async () => {
  let gameContainer = document.getElementById("app") as HTMLElement;
  const app = new Application();
  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x87ceeb,
  });

  gameContainer.appendChild(app.canvas);

  let currentScreen: BaseScreen;

  //load assets
  const taskOneAssets: string[] = [];
  let i = 143;

  while (i > 0) {
    Assets.add({ alias: `card_${i}`, src: `./assets/TaskOne/${i}.png` });
    taskOneAssets.push(`card_${i}`);
    i--;
  }

  const loadPromise = Assets.load(taskOneAssets);
  loadPromise.then((texturesData) => {
    console.log("foo");
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
        currentScreen = new TaskOneScreen();
        currentScreen.signal.on(signalName, (_data: any) => {
          switchScreens(_data);
        });
        app.stage.addChild(currentScreen);

        break;

      case ScreenEnum.SCREEN_THREE:
        currentScreen = new TaskOneScreen();
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
})();
