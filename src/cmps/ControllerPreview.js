import React, { useState, useEffect } from "react";
import PlayIcon from "../icons/PlayIcon";
import StopIcon from "../icons/StopIcon";

export default ({
  precentageChange,
  isPlaying,
  idx,
  isSubmitingProgram,
  setProgram,
  ActiveProgram,
}) => {
  const [inputValue, setInputValue] = useState(100);
  const [isLocalPlaying, setIsLocalPlaying] = useState(true);

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

  const handlePrecentageChange = () => {
    let newInputChangePrecentage = 100 / precentageChange;
    let newInputVal = inputValue - inputValue / newInputChangePrecentage;
    if (newInputVal > 100) {
      newInputVal = 100;
    }
    setInputValue(newInputVal);
  };

  const handleInputChange = (ev) => {
    setInputValue(ev.target.value);
  };

  const handleChangeOfProgram = () => {
    let newValueFromProgram = ActiveProgram.data.find(
      (room) => room.name === idx
    );
    setInputValue(newValueFromProgram.value);
  };

  return (
    <div className="controller-preview">
      <h1>Name {idx}</h1>
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
    </div>
  );
};
