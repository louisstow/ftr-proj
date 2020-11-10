import { Controller, ControllerEvent, Response } from "../Controller";
import { BaseState } from "./BaseState";
import { NextNumberState } from "./NextNumberState";

class FirstNumberState extends BaseState {
  prompt() {
    return "Please enter the first number";
  }

  handleInput(controller: Controller, line: string) {
    const response = controller.enterNumber(line);
    if (response === Response.FIB) {
      controller.emit(ControllerEvent.FIB);
    }
    return new NextNumberState();
  }
}

export { FirstNumberState };