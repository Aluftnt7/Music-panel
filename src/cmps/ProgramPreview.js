import React from "react";

export default ({ program, handleSettingProgram }) => {
  return (
    <div
      className="program-preview"
      onClick={() => handleSettingProgram(program)}
    >
      {program.name}
    </div>
  );
};
