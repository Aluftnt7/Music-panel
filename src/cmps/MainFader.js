import React, { useEffect, useState } from "react";
import PlayIcon from "../icons/PlayIcon";
import StopIcon from "../icons/StopIcon";

export default ({
  mainFaderVolume,
  oldMainFaderVolume,
  setMainFaderVolume,
  setOldMainFaderVolume,
  setPrecentageChange,
  isPlaying,
  setIsPlaying,
}) => {
  const handleMasterVolumeChange = (ev) => {
    setMainFaderVolume(ev.target.value);
    console.log("master volume in precentage is", ev.target.value);
  };

  const getPercentageChange = (oldNumber, newNumber) => {
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
  };

  const handleOldValues = (ev) => {
    let newPrecentageChange = getPercentageChange(
      oldMainFaderVolume,
      ev.target.value
    );
    setPrecentageChange(newPrecentageChange);
    console.log("just now", newPrecentageChange);
    setOldMainFaderVolume(ev.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div className="main-fader">
      <h1>Master</h1>
      <i
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        <PlayIcon isLocalPlaying={isPlaying} />
      </i>
      <i
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        <StopIcon isLocalPlaying={isPlaying} />
      </i>
      <input
        type="range"
        value={mainFaderVolume}
        onChange={(ev) => {
          handleMasterVolumeChange(ev);
          handleOldValues(ev);
        }}
        // onMouseUp={(ev) => handleOldValues(ev)}
      />
    </div>
  );
};
