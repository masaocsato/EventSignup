import axios from "axios";

export const postEvent = payload => {
  return axios.post("/eventsignup/", payload);
};

export const getAllEvent = () => {
  return axios.get("/eventsignup/");
};

export const putEvent = payload => {
  return axios.put("/eventsignup/", payload);
};

export const deleteEvent = id => {
  return axios.delete("/eventsignup/" + id);
};
