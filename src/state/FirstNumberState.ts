import {
  Controller,
  ControllerEvent,
  NumberEntryResponse,
} from "../Controller";
import { BaseState } from "./BaseState";
import { NextNumberState } from "./NextNumberState";

class FirstNumberState implements BaseState {
  prompt() {
    return "Please enter the first number";
  }

  handleInput(controller: Controller, line: string) {
    const response = controller.enterNumber(line);
    if (response === NumberEntryResponse.FIB) {
      controller.emit(ControllerEvent.FIB);
    }
    return new NextNumberState();
  }
}

export { FirstNumberState };
