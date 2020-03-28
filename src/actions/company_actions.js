import axios from "axios";
import { GET_SUMMARY, GET_USERS, GET_NATIONALITIES } from "./types";

export const getSummary = payload => ({
  type: GET_SUMMARY,
  payload
});

export const getSummaryFetch = () => dispatch => {
  const token = localStorage.getItem("token");
  return axios
    .get("/Data/GetSummary", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getSummary(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUsers = payload => ({
  type: GET_USERS,
  payload
});

export const getUsersFetch = () => dispatch => {
  const token = localStorage.getItem("token");
  return axios
    .get("/Data/ListUsers", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getUsers(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const getNationalities = payload => ({
  type: GET_NATIONALITIES,
  payload
});

export const getNationalitiesFetch = () => dispatch => {
  const token = localStorage.getItem("token");
  return axios
    .get("/Data/ListNationalities", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getNationalities(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};
