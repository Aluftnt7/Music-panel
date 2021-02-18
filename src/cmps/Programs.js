import React, { useState } from "react";
import ProgramPreview from "../cmps/ProgramPreview";

export default ({
  handleSubmit,
  setProgramName,
  programs,
  handleSettingProgram,
}) => {
  return (
    <div className="programs">
      <h1>Programs</h1>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <input
          type="text"
          placeholder="program name"
          onChange={(ev) => setProgramName(ev.target.value)}
        />
        <button>save program</button>
      </form>
      {!!programs.length &&
        programs.map((program, idx) => (
          <ProgramPreview
            program={program}
            key={idx}
            handleSettingProgram={handleSettingProgram}
          />
        ))}
    </div>
  );
};
