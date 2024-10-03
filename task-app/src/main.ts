import { Application } from "pixi.js";

(async () => {

  let gameContainer = document.getElementById("app") as HTMLElement;
    const app = new Application();
    await app.init({
        width: 800,
        height: 600,
        backgroundColor: 0x87CEEB
    });

    gameContainer.appendChild(app.canvas);

})();
