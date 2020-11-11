import { Frequency } from "./Frequency";
import { Timer } from "./Timer";
import { Fibonacci } from "./Fibonacci";
import { EventEmitter } from "events";

enum NumberEntryResponse {
  VALID,
  INVALID,
  FIB,
}

enum ControllerEvent {
  FIB = "fib",
}

class Controller extends EventEmitter {
  private timer: Timer;
  private frequency: Frequency;
  private fibonacci: Fibonacci;

  constructor(timer: Timer, frequency: Frequency) {
    super();
    this.timer = timer;
    this.frequency = frequency;
    this.fibonacci = new Fibonacci(1000);
  }

  public getFrequencyStatus() {
    const entries = this.frequency.getInDescendingOrder();
    if (entries.length === 0) {
      return "";
    }

    return entries.map((entry) => `${entry[0]}:${entry[1]}`).join(", ");
  }

  public halt() {
    this.timer.halt();
  }

  public resume() {
    this.timer.resume();
  }

  public isTimerRunning() {
    return this.timer.isRunning();
  }

  public enterNumber(line: string) {
    try {
      const number = BigInt(line);
      this.frequency.add(number);

      if (this.fibonacci.isFib(number)) {
        return NumberEntryResponse.FIB;
      }

      return NumberEntryResponse.VALID;
    } catch (err) {
      return NumberEntryResponse.INVALID;
    }
  }

  public enterInterval(line: string) {
    if (!line.length) {
      return false;
    }

    const interval = Number(line);

    if (isNaN(interval) || interval === 0) {
      return false;
    }

    this.timer.setInterval(interval);
    return true;
  }
}

export { Controller, NumberEntryResponse, ControllerEvent };
