import { Sprite, Text } from "pixi.js";

export const signalName: string = "SCREEN_SIGNAL";
export const ROPE_SIGNAL: string = "ROPE_SIGNAL";
export const IMPACT_SIGNAL: string = "IMPACT_SIGNAL";

export function pause(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

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
export function getRandomColor() {
  return Math.floor(Math.random() * 0xffffff);
}

export function fitTextToObject(text: Text, maxWidth: number) {
  if (text.width > maxWidth) {
    do {
      text.scale.set(-0.001, -0.001);
    } while (text.width > maxWidth);
  }
}
