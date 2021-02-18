import React, { useState, useEffect } from "react";
import ControllersList from "../cmps/ControllersList";
import Programs from "../cmps/Programs";

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

  useEffect(() => {
    if (program.length) {
      setPrograms((programs) => [
        ...programs,
        { name: programName, data: program },
      ]);
      setProgram([]);
    }
  }, [program]);

  useEffect(() => {
    console.log(programs);
  }, [programs]);

  return (
    <div className="admin-panel-container">
      <h1>AdminPanel</h1>
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
        />
      </div>
    </div>
  );
};
