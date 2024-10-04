import { Sprite } from "pixi.js";

export const signalName: string = "SCREEN_SIGNAL";

export namespace Library {
  export var myAssetsLibrary: Record<string, any> = {};
}

export function createSpriteFromId(textureId: string) {
  return new Sprite(Library.myAssetsLibrary[textureId]);
}

export type Timer = ReturnType<typeof setTimeout>;

export function generateRandomArray(
  size: number,
  min: number,
  max: number
): number[] {
  const randomArray: number[] = [];
  for (let i = 0; i < size; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
