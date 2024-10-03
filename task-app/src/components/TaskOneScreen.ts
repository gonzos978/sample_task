import { ScreenEnum } from "./ScreenEnum";
import { BaseScreen } from "./BaseScreen";
import { signalName } from "./Utils";

export class TaskOneScreen extends BaseScreen {
  constructor() {
    super();

    console.log("Screen 1");
  }

  protected override onClick(): void {
    this.signal.doEmmit(signalName, ScreenEnum.START_SCREEN);
  }
}
