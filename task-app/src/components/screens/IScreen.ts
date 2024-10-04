import { EventSignal } from "../signals/EventSignal";

export interface IScreen {
  signal: EventSignal;
  destroy: () => void;
}
