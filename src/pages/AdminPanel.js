import React, { useState, useEffect } from "react";

import ControllersList from "../cmps/ControllersList";
import Programs from "../cmps/Programs";

import { ProgramsService } from "../services/ProgramsService";

import RishonLogo from "../assets/png/logo-rishon.png";
import ThalamosLogo from "../assets/png/thalamus.png";

export default () => {
  const [program, setProgram] = useState([]);
  const [programName, setProgramName] = useState("");
  const [programs, setPrograms] = useState([]);
  const [isSubmitingProgram, setIsSubmitingProgram] = useState(false);
  const [ActiveProgram, setActiveProgram] = useState(null);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setIsSubmitingProgram(true);
    setTimeout(() => {
      setIsSubmitingProgram(false);
    }, 500);
  };

  const handleSettingProgram = (program) => {
    setActiveProgram(program);
  };

  const handleDeleteProgram = (programToDelete) => {
    let programsCopy = JSON.parse(JSON.stringify(programs));
    let idx = programs.findIndex(
      (program) => program._id === programToDelete._id
    );
    ProgramsService.deleteProgram(programToDelete);
    programsCopy.splice(idx, 1);
    setPrograms(programsCopy);
  };

  const updateActivePlayer = (isPlaying, idx) => {
    console.log(idx);
    console.log(isPlaying);
  };

  useEffect(async () => {
    if (program.length) {
      let updatedProgram = await ProgramsService.addProgram({
        programName,
        program,
      });
      setPrograms((programs) => [...programs, updatedProgram]);
      setProgram([]);
    }
  }, [program]);

  useEffect(async () => {
    setPrograms(await ProgramsService.getPrograms());
  }, []);

  return (
    <div className="admin-panel-container">
      <div className="nav-bar">
        <img className="logo" src={RishonLogo} />
        <img className="logo" src={ThalamosLogo} />
      </div>
      <div className="admin-panel">
        <ControllersList
          setProgram={setProgram}
          program={program}
          isSubmitingProgram={isSubmitingProgram}
          ActiveProgram={ActiveProgram}
        />
        <Programs
          handleSubmit={handleSubmit}
          programName={programName}
          setProgramName={setProgramName}
          programs={programs}
          handleSettingProgram={handleSettingProgram}
          handleDeleteProgram={handleDeleteProgram}
        />
      </div>
    </div>
  );
};
