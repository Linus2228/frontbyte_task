import axios from "axios";
import { GET_SUMMARY } from "./types";

export const getSummary = payload => ({
  type: GET_SUMMARY,
  payload
});

export const getSummaryFetch = () => dispatch => {
  const token = localStorage.getItem("token")
  return axios
    .get("/Data/GetSummary", { headers: { key: token }})
    .then(response => {
      dispatch(getSummary(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};
