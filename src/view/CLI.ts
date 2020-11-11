import readline from "readline";

import { Controller, ControllerEvent } from "../Controller";
import type { StateManager } from "../StateManager";

class CLI {
  controller: Controller;
  rl: readline.Interface;
  state: StateManager;

  constructor(
    controller: Controller,
    rl: readline.Interface,
    state: StateManager
  ) {
    this.controller = controller;
    this.rl = rl;
    this.state = state;

    rl.on("SIGINT", () => process.exit(1));
    controller.on(ControllerEvent.FIB, () => this.printLine("FIB"));
  }

  private printLine(line: string) {
    console.log(">>", line);
  }

  public showFrequency() {
    const status = this.controller.getFrequencyStatus();
    if (status) {
      this.printLine(status);
    }
  }

  public showPrompt() {
    const prompt = this.state.prompt();
    this.rl.question(`>> ${prompt}\n`, (answer) => this.handleInput(answer));
  }

  private handleHalt() {
    this.printLine("timer halted");
    this.controller.halt();
  }

  private handleResume() {
    this.printLine("timer resumed");
    this.controller.resume();
  }

  private handleQuit() {
    this.printLine("Thanks for playing.");
    this.rl.close();
    process.exit(0);
  }

  private handleInput(answer: string) {
    switch (answer) {
      case "halt":
        this.handleHalt();
        break;
      case "resume":
        this.handleResume();
        break;
      case "quit":
        this.handleQuit();
        break;
      default:
        this.state.handleInput(this.controller, answer);
        break;
    }

    this.showPrompt();
  }
}

export { CLI };
