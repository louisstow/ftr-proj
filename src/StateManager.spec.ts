import { StateManager } from "./StateManager";
import { NumberEntryResponse } from "./Controller";

import { NeedsIntervalState } from "./state/NeedsIntervalState";
import { FirstNumberState } from "./state/FirstNumberState";
import { NextNumberState } from "./state/NextNumberState";

test("Default state", () => {
  const stateManager = new StateManager();
  expect(stateManager.state).toBeInstanceOf(NeedsIntervalState);
});

test("Needs interval transitions", () => {
  const stateManager = new StateManager();
  expect(stateManager.state).toBeInstanceOf(NeedsIntervalState);

  const intervalFailedController = {
    enterInterval: jest.fn().mockReturnValue(false),
  };

  // @ts-ignore
  stateManager.handleInput(intervalFailedController, "5");

  expect(stateManager.state).toBeInstanceOf(NeedsIntervalState);
  expect(
    stateManager.prompt().includes("Please input the number of time")
  ).toBe(true);

  const intervalSucceedController = {
    enterInterval: jest.fn().mockReturnValue(true),
    resume: jest.fn(),
  };

  // @ts-ignore
  stateManager.handleInput(intervalSucceedController, "5");

  expect(stateManager.state).toBeInstanceOf(FirstNumberState);
  expect(intervalSucceedController.resume).toBeCalled();
});

test("First to next number transitions", () => {
  const stateManager = new StateManager();
  expect(stateManager.state).toBeInstanceOf(NeedsIntervalState);

  const controller = {
    enterInterval: jest.fn().mockReturnValue(true),
    enterNumber: jest.fn().mockReturnValue(NumberEntryResponse.FIB),
    emit: jest.fn(),
    resume: jest.fn(),
  };

  // @ts-ignore
  stateManager.handleInput(controller, "5");
  expect(stateManager.state).toBeInstanceOf(FirstNumberState);
  expect(stateManager.prompt().includes("first")).toBe(true);

  // @ts-ignore
  stateManager.handleInput(controller, "5");
  expect(stateManager.state).toBeInstanceOf(NextNumberState);
  expect(stateManager.prompt().includes("next")).toBe(true);

  // expect(controller.emit).toBeCalled();

  // @ts-ignore
  stateManager.handleInput(controller, "5");

  expect(controller.emit).toBeCalledTimes(2);
});
