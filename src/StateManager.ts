import type { Controller } from "./Controller";
import { BaseState } from "./state/BaseState";
import { NeedsIntervalState } from "./state/NeedsIntervalState";

class StateManager {
  state: BaseState;

  constructor() {
    this.state = new NeedsIntervalState();
  }

  public handleInput(controller: Controller, line: string) {
    this.state = this.state.handleInput(controller, line);
  }

  public prompt() {
    return this.state.prompt();
  }
}

export { StateManager };
