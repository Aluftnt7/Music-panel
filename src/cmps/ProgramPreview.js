import React from "react";

export default ({ program, handleSettingProgram, handleDeleteProgram }) => {
  return (
    <div className="program-preview">
      <div className="program-details">
        <h4
          className="program-name"
          onClick={() => handleSettingProgram(program)}
        >
          {" "}
          {program.programName}
        </h4>
        <h4 className="x-mark" onClick={() => handleDeleteProgram(program)}>
          X
        </h4>
      </div>
    </div>
  );
};
