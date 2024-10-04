import { EventEmitter } from "pixi.js";

export class EventSignal extends EventEmitter {
  constructor() {
    super();
  }

  doEmmit(_eventName: string, _data: any) {
    this.emit(_eventName, _data);
  }
}
