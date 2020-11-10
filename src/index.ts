import readline from "readline";

import { CLI } from "./view/CLI";
import { Frequency } from "./Frequency";
import { Timer, TimerEvent } from "./Timer";
import { Controller } from "./Controller";
import { StateManager } from "./StateManager";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const frequency = new Frequency();
const timer = new Timer();
const controller = new Controller(timer, frequency);

const stateManager = new StateManager();

const cli = new CLI(controller, rl, stateManager);

timer.on(TimerEvent.INTERVAL, () => cli.showFrequency());

cli.showPrompt();
