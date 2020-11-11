import { Timer } from "./Timer";

jest.useFakeTimers();

test("Basic interval", () => {
  const callback = jest.fn();
  const timer = new Timer();
  timer.on("interval", callback);

  timer.setInterval(1);

  expect(callback).not.toBeCalled();

  timer.resume();
  expect(timer.isRunning()).toBe(true);
  jest.runOnlyPendingTimers();

  expect(callback).toBeCalled();
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test("Halt and catch fire", () => {
  const callback = jest.fn();
  const timer = new Timer();
  timer.on("interval", callback);
  timer.setInterval(1);

  expect(callback).not.toBeCalled();

  timer.resume();
  timer.halt();

  jest.runOnlyPendingTimers();
  expect(callback).not.toBeCalled();
  expect(clearInterval).toBeCalled();
});

test("Timer errors with no interval set", () => {
  expect(() => {
    const timer = new Timer();

    timer.resume();
  }).toThrowError();
});

test("Timer errors when resuming twice", () => {
  expect(() => {
    const callback = jest.fn();
    const timer = new Timer();

    timer.on("interval", callback);

    timer.setInterval(1);
    timer.resume();
    timer.resume();
  }).toThrowError();
});
