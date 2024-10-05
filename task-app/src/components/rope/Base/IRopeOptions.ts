import { BLEND_MODES } from "pixi.js";

export interface IRopeOptions {
  blendMode: BLEND_MODES;
  duration: number;
  lengthInPoints: number;
  numPoints: number;
  tint?: number;
  //easing: (t: number) => number
}
