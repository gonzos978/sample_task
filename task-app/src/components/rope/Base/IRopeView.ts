import { Container, Point } from "pixi.js";
import { IRopeOptions } from "./IRopeOptions";

export interface IRopeView {
  setOptions(options: IRopeOptions): void;
  startRope(points: Point[]): void;
  setContainer(container: Container): void;
  hideAll(): void;
}
