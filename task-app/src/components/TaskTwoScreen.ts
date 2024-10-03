import { BaseScreen } from "./BaseScreen";
import { ScreenEnum } from "./ScreenEnum";
import { signalName } from "../Utils";

export class TaskOneScreen extends BaseScreen {
  constructor() {
    super();

    console.log("Screen 2");
  }

  protected override onClick(): void {
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }
}
