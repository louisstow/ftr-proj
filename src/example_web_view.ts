import React, { useState, useEffect } from "react";
import { Frequency } from "./Frequency";
import { Timer } from "./Timer";
import { Controller } from "./Controller";
import { StateManager } from "./State";

const frequency = new Frequency();
const timer = new Timer();
const controller = new Controller(timer, frequency);

const Application = () => {
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState("");
  const [applicationState, setApplicationState] = useState(
    ApplicationState.NEEDS_INTERVAL
  );

  const submitText = () => {
    if (applicationState === ApplicationState.NEEDS_INTERVAL) {
      controller.enterInterval();
    }
  };

  const onInterval = () => {
    setStatus(controller.getFrequencyStatus());
  };

  useEffect(() => {
    timer.on("interval", onInterval);
    return () => {
      timer.off("interval", onInterval);
    };
  }, []);

  return (
    <>
      <div>Status: {status}</div>
      <div></div>
      <div>
        <input type="text" onChange={(e) => setTextInput(e.target.value)} />
        <button onClick={submitText}>Enter</button>
      </div>
    </>
  );
};
