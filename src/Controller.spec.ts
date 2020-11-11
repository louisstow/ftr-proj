import { Controller, NumberEntryResponse } from "./Controller";

const mockTimer = {
  setInterval: jest.fn(),
  halt: jest.fn(),
  resume: jest.fn(),
};

const mockFreq = {
  add: jest.fn(),
};

test("Enter number", () => {
  // @ts-ignore
  const controller = new Controller(mockTimer, mockFreq);

  expect(controller.enterNumber("56")).toBe(NumberEntryResponse.VALID);
  expect(controller.enterNumber("55")).toBe(NumberEntryResponse.FIB);
  expect(controller.enterNumber("no")).toBe(NumberEntryResponse.INVALID);

  expect(mockFreq.add).toBeCalledTimes(2);
});

test("Enter interval", () => {
  // @ts-ignore
  const controller = new Controller(mockTimer, mockFreq);

  expect(controller.enterInterval("56")).toBe(true);
  expect(controller.enterInterval("0")).toBe(false);
  expect(controller.enterInterval("")).toBe(false);

  expect(mockTimer.setInterval).toBeCalledTimes(1);
});

test("Frequency status", () => {
  const mockEmptyFreq = {
    getInDescendingOrder: jest.fn().mockImplementation(() => []),
  };

  const mockFilledFreq = {
    getInDescendingOrder: jest.fn().mockImplementation(() => [
      ["2", 2],
      ["1", 1],
    ]),
  };

  // @ts-ignore
  const controllerEmpty = new Controller(mockTimer, mockEmptyFreq);
  expect(controllerEmpty.getFrequencyStatus()).toBe("");

  // @ts-ignore
  const controllerFilled = new Controller(mockTimer, mockFilledFreq);
  expect(controllerFilled.getFrequencyStatus()).toBe("2:2, 1:1");
});

test("Halt and resume", () => {
  const timer = {
    ...mockTimer,
    isRunning: jest.fn().mockReturnValue(true),
  };
  // @ts-ignore
  const controller = new Controller(timer, mockFreq);
  controller.halt();
  expect(mockTimer.halt).toBeCalled();

  controller.resume();
  expect(mockTimer.resume).toBeCalled();
  expect(controller.isTimerRunning()).toBe(true);
});
