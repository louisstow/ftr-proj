import type { Controller } from "../Controller";
import { BaseState } from "./BaseState";
import { FirstNumberState } from "./FirstNumberState";

class NeedsIntervalState extends BaseState {
  prompt() {
    return "Please input the number of time in seconds between emitting numbers and their frequency";
  }

  handleInput(controller: Controller, line: string): BaseState {
    if (controller.enterInterval(line)) {
      controller.resume();
      return new FirstNumberState();
    }
    return this;
  }
}

export { NeedsIntervalState };
