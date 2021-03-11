import React, { useState } from "react";
import ProgramPreview from "../cmps/ProgramPreview";
import Loader from "../cmps/Loader";

export default ({
  handleSubmit,
  setProgramName,
  programs,
  handleSettingProgram,
  handleDeleteProgram,
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
      {!programs.length ? (
        <Loader />
      ) : (
        programs.map((program, idx) => (
          <ProgramPreview
            program={program}
            handleDeleteProgram={handleDeleteProgram}
            key={idx}
            handleSettingProgram={handleSettingProgram}
          />
        ))
      )}
    </div>
  );
};
