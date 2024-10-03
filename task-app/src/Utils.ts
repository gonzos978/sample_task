import { Sprite } from "pixi.js";
import { MainApp } from "./main";

export const signalName: string = "SCREEN_SIGNAL";

export namespace Library {
  export var myAssetsLibrary: Record<string, any> = {};
}

export function createSpriteFromId(textureId: string) {
  return new Sprite(Library.myAssetsLibrary[textureId]);
}

export type Timer = ReturnType<typeof setTimeout>;
