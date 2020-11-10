import type { Controller } from "./Controller";
import { BaseState } from "./state/BaseState";
import { NeedsIntervalState } from "./state/NeedsIntervalState";

class StateManager {
  state: BaseState;

  constructor() {
    this.state = new NeedsIntervalState();
  }

  handleInput(controller: Controller, line: string) {
    this.state = this.state.handleInput(controller, line);
  }

  prompt() {
    return this.state.prompt();
  }
}

export { StateManager };
