import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import SocketService from "../services/SocketService";
import CloudinaryService from "../services/CloudinaryService";
import { RoomService } from "../services/RoomService";

import ReactPlayer from "react-player";

import SongPreview from "../cmps/SongPreview";
import Loader from "../cmps/Loader";

import HomeIcon from "../icons/HomeIcon";
import AddSongIcon from "../icons/AddSongIcon";
import RemoveSongIcon from "../icons/RemoveSongIcon";

export default (props) => {
  const [roomIdx, setRoomIdx] = useState(null);
  const [songIdx, setSongIdx] = useState(0);
  const [idToDelete, setSongIdToDelete] = useState([]);
  const [volume, setVolume] = useState(null);
  const [isSendingData, setIsSendingData] = useState(false);
  const [room, setRoom] = useState(null);
  const [songObg, setSongObj] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [playList, setPlaylist] = useState([]);
  const [playStatus, setPlayStatus] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [playingTime, setPlayingTime] = useState([
    { hours: 10, minutes: 0, seconds: 0, action: "play" },
    { hours: 14, minutes: 0, seconds: 0, action: "pause" },
    { hours: 16, minutes: 0, seconds: 0, action: "play" },
    { hours: 20, minutes: 0, seconds: 0, action: "pause" },
  ]);
  const musicPlayerEl = useRef();

  const conectSockets = () => {
    SocketService.on(`change volume ${roomIdx}`, ({ newValue }) => {
      setVolume(newValue / 100);
    });
    SocketService.on(`new play status ${roomIdx}`, ({ isLocalPlaying }) => {
      setPlayStatus(isLocalPlaying);
    });
    SocketService.on(`check for volume status in room ${roomIdx}`, () => {
      setIsSendingData(true);
      setTimeout(() => {
        setIsSendingData(false);
      }, 500);
      // console.log("volume check", volume);
      // if (volume) {
      //   SocketService.emit(`Active`, { roomIdx, volume });
      // }
    });
  };

  const disconnectSockets = () => {
    if (roomIdx) {
      SocketService.off(`change volume ${roomIdx}`);
      SocketService.off(`new play status ${roomIdx}`);
      SocketService.off(`check for volume status in room ${roomIdx}`);
    }
    SocketService.terminate();
  };

  const onUploadSong = async (ev) => {
    setIsUploading(true);
    let newSongUrl = await CloudinaryService.uploadSong(ev);
    setSongObj({
      name: newSongUrl.original_filename,
      songUrl: newSongUrl.secure_url,
    });
    setIsUploading(false);
  };

  const playNextSong = () => {
    setPlayStatus(false);
    let nextIdx = songIdx + 1;
    nextIdx %= playList.length;
    setSongIdx(nextIdx);
    setPlayStatus(true);
  };

  const updatePlaylist = (newSong) => {
    let playlist = room.playlist.map((song) => {
      return song.songUrl;
    });
    return newSong ? playlist.push(newSong) : playlist;
  };

  // const handlePlayStatus = () => {
  //   setPlayStatus(true);
  //   SocketService.emit(`update status from player`, {
  //     roomIdx,
  //     playStatus: true,
  //   });
  // };
  // const handlePauseStatus = () => {
  //   setPlayStatus(false);
  //   SocketService.emit(`update status from player`, {
  //     roomIdx,
  //     playStatus: false,
  //   });
  // };

  const generatePlayingTimes = (hours, minutes, seconds) => {
    let activatingTime = new Date();
    activatingTime.setHours(hours);
    activatingTime.setMinutes(minutes);
    activatingTime.setSeconds(seconds);
    return activatingTime;
  };

  const toggleIsDeleting = () => {
    setIsDeleting(!isDeleting);
  };

  const handleDeletingSongs = () => {
    if (!idToDelete.length) return;
    let roomCopy = JSON.parse(JSON.stringify(room));
    idToDelete.forEach((id) => {
      const idx = roomCopy.playlist.findIndex((song) => id === song._id);
      roomCopy.playlist.splice(idx, 1);
    });
    setRoom(roomCopy);
    setSongIdToDelete("");
    RoomService.save(roomCopy);
  };

  const handlePlayingTime = () => {
    const runEveryDay = (act) => {
      switch (act) {
        case "play":
          setPlayStatus(true);
          console.log("playing");
          break;
        case "pause":
          setPlayStatus(false);
          console.log("stopping");
          break;
      }
      setTimeout((_) => {
        runEveryDay(act);
      }, 24 * 60 * 60 * 1000);
    };
    playingTime.forEach((t) => {
      let hour = generatePlayingTimes(t.hours, t.minutes, t.seconds);
      var time = hour - new Date();
      if (time < 0) time += 24 * 60 * 60 * 1000;
      setTimeout((_) => {
        runEveryDay(t.action);
      }, time);
    });
  };

  useEffect(async () => {
    setRoomIdx(props?.match?.params?.id);
    await navigator.mediaDevices.getUserMedia({ audio: true });
    handlePlayingTime();
  }, []);

  useEffect(() => {
    if (songObg) {
      let roomCopy = JSON.parse(JSON.stringify(room));
      roomCopy.playlist.push(songObg);
      setRoom(roomCopy);
      RoomService.addNewSong(songObg, roomIdx);
      setPlaylist(updatePlaylist(songObg.songUrl));
    }
  }, [songObg]);

  useEffect(async () => {
    if (roomIdx) {
      setRoom(await RoomService.getRoom({ roomIdx }));
    }
  }, [roomIdx]);

  useEffect(() => {
    SocketService.setup();
    if (room) {
      setPlaylist(updatePlaylist());
      conectSockets();
    }
    return () => {
      disconnectSockets();
    };
  }, [room]);

  useEffect(() => {
    if (isSendingData && volume) {
      SocketService.emit(`Active`, { roomIdx, volume });
    }
  }, [isSendingData]);

  return !room ? (
    <Loader />
  ) : (
    <div className="music-player">
      <div className="music-player-header">
        <h2>{roomIdx}</h2>
        <h2>Room Name</h2>
        {playList.length && (
          <div className="player-wrapper">
            <ReactPlayer
              playing={playStatus}
              controls
              url={playList[songIdx]}
              className="react-player"
              volume={volume}
              onEnded={playNextSong}
              height="10%"
              ref={musicPlayerEl}
            />
          </div>
        )}
        <Link to={`/`}>
          <HomeIcon />
        </Link>
      </div>
      {isUploading ? (
        <Loader />
      ) : (
        <div className="song-list">
          <span className="songs">
            {room &&
              room.playlist.map((song, idx) => (
                <SongPreview
                  song={song}
                  key={idx}
                  idx={idx}
                  isDeleting={isDeleting}
                  handleDeletingSongs={handleDeletingSongs}
                  idToDelete={idToDelete}
                  setSongIdToDelete={setSongIdToDelete}
                />
              ))}
          </span>

          <span className="icons">
            <i>
              <label>
                <AddSongIcon />
                <input type="file" onChange={(ev) => onUploadSong(ev)} hidden />
              </label>
            </i>
            <i
              onClick={() => {
                toggleIsDeleting();
                handleDeletingSongs();
              }}
            >
              <RemoveSongIcon isDeleting={isDeleting} />
            </i>
          </span>
        </div>
      )}
    </div>
  );
};
