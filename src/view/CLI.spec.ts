import { CLI } from "./CLI";
import { Response } from "../Controller";

const spy = jest.spyOn(console, "log");

// @ts-ignore
const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

const mockReadlineSimple = {
  question: jest.fn(),
  close: jest.fn(),
  on: jest.fn(),
};

test("Printing lines", () => {
  const mockController = {
    getFrequencyStatus: jest.fn().mockImplementation(() => "status"),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadlineSimple);

  cli.printLine("x");
  expect(spy).toBeCalledWith(">>", "x");

  cli.showFrequency();
  expect(mockController.getFrequencyStatus).toBeCalled();
  expect(spy).toHaveBeenLastCalledWith(">>", "status");
});

test("Requesting interval failed", () => {
  const mockIntervalResponse = "0";
  const mockController = {
    enterInterval: jest.fn().mockReturnValue(false),
    resume: jest.fn(),
  };

  const mockReadline = {
    question: jest.fn().mockImplementationOnce((q, callback) => {
      callback(mockIntervalResponse);
    }),
    on: jest.fn(),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadline);

  cli.requestInterval();
  expect(mockController.enterInterval).toBeCalledWith(mockIntervalResponse);
  expect(mockReadline.question).toBeCalled();
  expect(mockController.resume).not.toBeCalled();
});

test("Requesting interval succeed", () => {
  const mockIntervalResponse = "5";
  const mockController = {
    enterInterval: jest.fn().mockReturnValue(true),
    resume: jest.fn(),
  };

  const mockReadline = {
    question: jest.fn().mockImplementationOnce((q, callback) => {
      callback(mockIntervalResponse);
    }),
    on: jest.fn(),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadline);

  cli.requestInterval();
  expect(mockController.enterInterval).toBeCalledWith(mockIntervalResponse);
  expect(mockReadline.question).toBeCalled();
  expect(mockController.resume).toBeCalled();
});

test("Requesting line", () => {
  const mockLineResponse = "5";
  const mockController = {
    enterNumber: jest.fn(),
  };

  const mockReadline = {
    question: jest.fn().mockImplementationOnce((q, callback) => {
      callback(mockLineResponse);
    }),
    on: jest.fn(),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadline);

  cli.requestLine();
  expect(mockController.enterNumber).toHaveBeenCalledWith(mockLineResponse);
});

test("Handling line inputs", () => {
  const mockController = {
    enterNumber: jest.fn(),
    halt: jest.fn(),
    resume: jest.fn(),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadlineSimple);

  cli.handleInput("5");
  expect(mockController.enterNumber).toHaveBeenCalledWith("5");

  cli.handleInput("halt");
  expect(mockController.halt).toHaveBeenCalled();
  expect(spy).toHaveBeenLastCalledWith(">>", "timer halted");

  cli.handleInput("resume");
  expect(mockController.resume).toHaveBeenCalled();
  expect(spy).toHaveBeenLastCalledWith(">>", "timer resumed");

  cli.handleInput("quit");
  expect(mockReadlineSimple.close).toHaveBeenCalled();
  expect(mockExit).toHaveBeenCalledWith(0);
});

test("Handling fib input", () => {
  const mockController = {
    enterNumber: jest.fn().mockReturnValue(Response.FIB),
    halt: jest.fn(),
    resume: jest.fn(),
  };

  // @ts-ignore
  const cli = new CLI(mockController, mockReadlineSimple);

  cli.handleInput("1");
  expect(spy).toHaveBeenLastCalledWith(">>", "FIB");
});
