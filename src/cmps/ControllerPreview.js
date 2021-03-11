import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PlayIcon from "../icons/PlayIcon";
import StopIcon from "../icons/StopIcon";
import MoveTo from "../icons/MoveToIcon";

import SocketService from "../services/SocketService";

export default ({
  precentageChange,
  isPlaying,
  idx,
  isSubmitingProgram,
  setProgram,
  ActiveProgram,
  mainFaderVolume,
}) => {
  const [inputValue, setInputValue] = useState(mainFaderVolume);
  const [oldInputValue, setOldInputValue] = useState(null);
  const [isLocalPlaying, setIsLocalPlaying] = useState(true);

  const handlePrecentageChange = () => {
    let newInputChangePrecentage = 100 / precentageChange;
    let newInputVal = inputValue - inputValue / newInputChangePrecentage;
    if (newInputVal > 100) {
      newInputVal = 100;
    }
    if (mainFaderVolume === 0) {
      setInputValue(mainFaderVolume);
      return;
    }
    inputValue === 0 && !newInputChangePrecentage
      ? setInputValue(
          mainFaderVolume / (100 / Math.abs(newInputChangePrecentage))
        )
      : setInputValue(newInputVal);
    if (inputValue === 0) {
      setInputValue(mainFaderVolume);
    }
    setOldInputValue(inputValue);
  };

  const handleInputChange = (ev) => {
    setInputValue(ev.target.value);
    SocketService.emit(`volume changed`, { idx, inputValue: ev.target.value });
  };

  const disconnectSockets = () => {
    if (idx && SocketService.isSocketAvailable()) {
      SocketService.off(`new play status from player ${idx}`);
      SocketService.off(`Active player in room ${idx}`);
      SocketService.terminate();
    }
  };

  const connectSockets = () => {
    SocketService.setup();
    SocketService.on(`new play status from player ${idx}`, ({ playStatus }) => {
      setIsLocalPlaying(playStatus);
    });
    SocketService.on(`Active player in room ${idx}`, ({ volume }) => {
      setInputValue(volume * 100);
    });
  };

  const handleChangeOfProgram = () => {
    let newValueFromProgram = ActiveProgram.program.find(
      (room) => room.name === idx
    );
    setInputValue(newValueFromProgram.value);
    SocketService.emit(`volume changed`, {
      idx,
      inputValue: newValueFromProgram.value,
    });
  };

  useEffect(() => {
    if (precentageChange) {
      handlePrecentageChange();
    }
  }, [precentageChange]);

  useEffect(() => {
    setIsLocalPlaying(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (ActiveProgram) {
      handleChangeOfProgram();
    }
  }, [ActiveProgram]);

  useEffect(() => {
    if (isSubmitingProgram) {
      setProgram((program) => [...program, { name: idx, value: inputValue }]);
    }
  }, [isSubmitingProgram]);

  useEffect(() => {
    connectSockets();
    SocketService.emit(`checking for active players on room`, { idx });
    return () => {
      disconnectSockets();
    };
  }, []);

  useEffect(() => {
    if (oldInputValue !== inputValue && oldInputValue) {
      SocketService.emit(`volume changed`, { idx, inputValue });
    }
  }, [oldInputValue]);

  useEffect(() => {
    SocketService.emit(`playing status`, { idx, isLocalPlaying });
  }, [isLocalPlaying]);

  return (
    <div className="controller-preview">
      <div className="controller-info">
        <h1>Name</h1>
        <h1>{idx}</h1>
      </div>
      <i
        onClick={() => {
          setIsLocalPlaying(!isLocalPlaying);
        }}
      >
        <PlayIcon isLocalPlaying={isLocalPlaying} />
      </i>
      <i
        onClick={() => {
          setIsLocalPlaying(!isLocalPlaying);
        }}
      >
        <StopIcon isLocalPlaying={isLocalPlaying} />
      </i>
      <input
        type="range"
        min="0"
        max="100"
        value={inputValue}
        onChange={(ev) => {
          handleInputChange(ev);
        }}
      />
      <Link to={`/player/${idx}`}>
        <MoveTo />
      </Link>
    </div>
  );
};
