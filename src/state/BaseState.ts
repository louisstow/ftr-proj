import type { Controller } from "../Controller";

interface BaseState {
  prompt(): string;
  handleInput(controller: Controller, line: string): BaseState;
}

export { BaseState };
