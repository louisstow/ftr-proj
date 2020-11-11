import {
  Controller,
  ControllerEvent,
  NumberEntryResponse,
} from "../Controller";
import { BaseState } from "./BaseState";

class NextNumberState implements BaseState {
  prompt() {
    return "Please enter the next number";
  }

  handleInput(controller: Controller, line: string) {
    const response = controller.enterNumber(line);
    if (response === NumberEntryResponse.FIB) {
      controller.emit(ControllerEvent.FIB);
    }
    return this;
  }
}

export { NextNumberState };
