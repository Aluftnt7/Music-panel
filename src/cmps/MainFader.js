import React, { useEffect, useState } from "react";

import PlayIcon from "../icons/PlayIcon";
import StopIcon from "../icons/StopIcon";

import SocketService from "../services/SocketService";

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
    SocketService.emit(`main fader volume changed`, {
      volume: ev.target.value,
    });
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
    setOldMainFaderVolume(ev.target.value);
  };

  useEffect(() => {
    SocketService.setup();
    SocketService.on(`main fader new volume`, ({ volume }) => {
      setMainFaderVolume(volume);
    });
    return () => {
      SocketService.off(`main fader new volume`);
      SocketService.terminate();
    };
  }, []);

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
