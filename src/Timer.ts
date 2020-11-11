import { EventEmitter } from "events";

enum TimerEvent {
  INTERVAL = "interval",
}

class Timer extends EventEmitter {
  private interval: number | undefined;
  private intervalId: NodeJS.Timeout | undefined;

  public setInterval(intervalInSeconds: number) {
    this.interval = intervalInSeconds * 1000;
  }

  public getInterval() {
    return this.interval;
  }

  public isRunning() {
    return this.intervalId !== undefined;
  }

  private onInterval() {
    this.emit(TimerEvent.INTERVAL);
  }

  public resume() {
    if (this.interval === undefined) {
      throw new Error("Must specify an interval in seconds");
    }

    if (this.isRunning()) {
      throw new Error("Timer has already started");
    }

    this.intervalId = setInterval(() => this.onInterval(), this.interval);
  }

  public halt() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}

export { Timer, TimerEvent };
