import { HttpService } from "./HttpService";
import UtilService from "./UtilService";

// function query(critirea) {
//   const params = new URLSearchParams(critirea);
//   return HttpService.get(`programs?${params}`);
// }

function getPrograms(filterBy) {
  const queryParams = new URLSearchParams();
  if (filterBy) {
    for (const property in filterBy) {
      if (filterBy[property]) {
        queryParams.set(property, filterBy[property]);
      }
    }
  }
  return HttpService.get(`programs?${queryParams}`);
}

async function addProgram(programData) {
  console.log("in SERVICE ", programData);
  programData._id = UtilService.makeId();
  console.log(programData);
  let res = await HttpService.post("programs", programData);
  console.log(res);
  return res;
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

async function deleteProgram(program) {
  await HttpService.delete(`programs/${program._id}`, program);
}

export const ProgramsService = {
  // query,
  getById,
  save,
  remove,
  addProgram,
  getPrograms,
  deleteProgram,
};
