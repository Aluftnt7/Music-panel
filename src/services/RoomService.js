import { HttpService } from "./HttpService";
import UtilService from "./UtilService";

function query(critirea) {
  const params = new URLSearchParams(critirea);
  return HttpService.get(`room?${params}`);
}
function getRoom(filterBy) {
  const queryParams = new URLSearchParams();
  if (filterBy) {
    for (const property in filterBy) {
      if (filterBy[property]) {
        queryParams.set(property, filterBy[property]);
      }
    }
    return HttpService.get(`room?${queryParams}`);
  }
}

async function addNewSong(songObj, idx) {
  songObj._id = UtilService.makeId();
  return HttpService.put(`room/add-song/${idx}`, { songObj, idx });
}

function getById(filterBy) {
  const queryParams = new URLSearchParams();
  if (filterBy) {
    for (const property in filterBy) {
      if (filterBy[property]) {
        queryParams.set(property, filterBy[property]);
      }
    }
    return HttpService.get(`room?${queryParams}`);
  }
}

function remove(id) {
  return HttpService.delete(`room/${id}`);
}

async function save(room) {
  let prm;

  if (room._id) prm = HttpService.put(`room/${room._id}`, room);
  else {
    prm = HttpService.post("room", room);
  }
  const res = await prm;
  return res;
}

export const RoomService = {
  query,
  getById,
  save,
  remove,
  addNewSong,
  getRoom,
};
