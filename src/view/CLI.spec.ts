import { CLI } from "./CLI";
import { NumberEntryResponse } from "../Controller";

const spy = jest.spyOn(console, "log");

// @ts-ignore
const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

const mockReadline = {
  question: jest.fn(),
  close: jest.fn(),
  on: jest.fn(),
};

const mockController = {
  on: jest.fn(),
  halt: jest.fn(),
  resume: jest.fn(),
  enterNumber: jest.fn(),
  enterInterval: jest.fn(),
  getFrequencyStatus: jest.fn(),
};

const mockStateManager = {
  prompt: jest.fn(),
  handleInput: jest.fn(),
};

test("Printing lines", () => {
  const controller = {
    ...mockController,
    getFrequencyStatus: jest.fn().mockImplementation(() => "status"),
  };

  // @ts-ignore
  const cli = new CLI(controller, mockReadline, mockStateManager);

  cli.showFrequency();
  expect(controller.getFrequencyStatus).toBeCalled();
  expect(spy).toHaveBeenLastCalledWith(">>", "status");
});

test("showPrompt", () => {
  const stateManager = {
    ...mockStateManager,
    prompt: jest.fn().mockReturnValue("PROMPT"),
  };
  // @ts-ignore
  const cli = new CLI(mockController, mockReadline, stateManager);

  cli.showPrompt();
  expect(mockReadline.question).toBeCalledWith(
    ">> PROMPT\n",
    expect.any(Function)
  );
});

test("handleHalt", () => {
  const fn = "halt";
  const readline = {
    ...mockReadline,
    question: jest.fn().mockImplementationOnce((_, callback) => callback(fn)),
  };

  // @ts-ignore
  const cli = new CLI(mockController, readline, mockStateManager);
  cli.showPrompt();

  expect(mockController.halt).toBeCalled();
});

test("handleResume", () => {
  const fn = "resume";
  const readline = {
    ...mockReadline,
    question: jest.fn().mockImplementationOnce((_, callback) => callback(fn)),
  };

  // @ts-ignore
  const cli = new CLI(mockController, readline, mockStateManager);
  cli.showPrompt();

  expect(mockController.resume).toBeCalled();
});

test("handleQuit", () => {
  const fn = "quit";
  const readline = {
    ...mockReadline,
    question: jest.fn().mockImplementationOnce((_, callback) => callback(fn)),
  };

  // @ts-ignore
  const cli = new CLI(mockController, readline, mockStateManager);
  cli.showPrompt();

  expect(readline.close).toBeCalled();
});

test("handle other input", () => {
  const fn = "99";
  const readline = {
    ...mockReadline,
    question: jest.fn().mockImplementationOnce((_, callback) => callback(fn)),
  };

  // @ts-ignore
  const cli = new CLI(mockController, readline, mockStateManager);
  cli.showPrompt();

  expect(mockStateManager.handleInput).toBeCalled();
});
