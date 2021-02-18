import React, { useState } from "react";
import ControllerPreview from "../cmps/ControllerPreview";
import MainFader from "../cmps/MainFader";

export default ({ setProgram, program, isSubmitingProgram, ActiveProgram }) => {
  const totalPlayersNumber = 8;
  const musicPlayers = new Array(totalPlayersNumber).fill(null);

  const [mainFaderVolume, setMainFaderVolume] = useState(100);
  const [oldMainFaderVolume, setOldMainFaderVolume] = useState(100);
  const [precentageChange, setPrecentageChange] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="controller-list">
      <MainFader
        mainFaderVolume={mainFaderVolume}
        oldMainFaderVolume={oldMainFaderVolume}
        setMainFaderVolume={setMainFaderVolume}
        setOldMainFaderVolume={setOldMainFaderVolume}
        setPrecentageChange={setPrecentageChange}
        precentageChange={precentageChange}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      {musicPlayers.map((_, idx) => (
        <ControllerPreview
          idx={idx}
          key={idx}
          mainFaderVolume={mainFaderVolume}
          setOldMainFaderVolume={setOldMainFaderVolume}
          precentageChange={precentageChange}
          isPlaying={isPlaying}
          program={program}
          isSubmitingProgram={isSubmitingProgram}
          setProgram={setProgram}
          ActiveProgram={ActiveProgram}
        />
      ))}
    </div>
  );
};
