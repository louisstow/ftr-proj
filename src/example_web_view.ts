import React, { useState, useEffect } from "react";
import { Frequency } from "./Frequency";
import { Timer, TimerEvent } from "./Timer";
import { Controller, ControllerEvent } from "./Controller";
import { StateManager } from "./StateManager";

const frequency = new Frequency();
const timer = new Timer();
const controller = new Controller(timer, frequency);

const stateManager = new StateManager();

const Application = () => {
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState("");
  const [prompt, setPrompt] = useState(stateManager.prompt());

  const submitText = () => {
    stateManager.handleInput(controller, textInput);
    setPrompt(stateManager.prompt());
  };

  const onInterval = () => {
    setStatus(controller.getFrequencyStatus());
  };

  const onFib = () => {
    window.alert("FIB");
  };

  const onHalt = () => {
    setPrompt("halted");
    controller.halt();
  };

  const onResume = () => {
    if (!controller.isTimerRunning()) {
      controller.resume();
    }
  };

  useEffect(() => {
    timer.on(TimerEvent.INTERVAL, onInterval);
    controller.on(ControllerEvent.FIB, onFib);
    return () => {
      timer.off(TimerEvent.INTERVAL, onInterval);
      controller.off(ControllerEvent.FIB, onFib);
    };
  }, []);

  return (
    <>
      <div>Status: {status}</div>
      <div>Prompt: {prompt}</div>
      <div>
        <input type="text" onChange={(e) => setTextInput(e.target.value)} />
        <button onClick={submitText}>Enter</button>
      </div>
      <div>
        <button onClick={onHalt}>Halt</button>
        <button onClick={onResume}>Resume</button>
      </div>
    </>
  );
};
