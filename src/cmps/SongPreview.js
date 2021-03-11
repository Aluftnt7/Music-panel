import React, { useState, useEffect } from "react";

export default ({
  song,
  idx,
  isDeleting,
  handleDeletingSongs,
  idToDelete,
  setSongIdToDelete,
}) => {
  const handleIdToDelete = () => {
    var isIdAdded = idToDelete.includes(song._id);
    isIdAdded
      ? setSongIdToDelete(idToDelete.filter((id) => id !== song._id))
      : setSongIdToDelete([...idToDelete, song._id]);
  };

  return (
    <div className="song-preview">
      {isDeleting && (
        <input type="checkbox" onChange={() => handleIdToDelete()} />
      )}
      <h2>
        {idx + 1} - {song.name}
      </h2>
    </div>
  );
};
