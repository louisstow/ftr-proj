import type { Controller } from "../Controller";

class BaseState {
  prompt() {
    return "";
  }

  handleInput(controller: Controller, line: string): BaseState {
    return this;
  }
}

export { BaseState };
