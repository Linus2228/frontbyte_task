import axios from "axios";
import { logout } from "./authActions";
import { toastSuccess, toastError } from "../utils/toastNotifications";
import { EXPIRED_SESSION_MESSAGE } from "../constants";
import { getDataRequest } from "../utils/helpers";
import {
  GET_SUMMARY_START,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_FAILURE,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_NATIONALITIES_START,
  GET_NATIONALITIES_SUCCESS,
  GET_NATIONALITIES_FAILURE,
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_FINISH,
  GET_NATIONALITIES_HASH,
  GET_RANKS_START,
  GET_RANKS_SUCCESS,
  GET_RANKS_FAILURE
} from "./types";

export const getSummaryStart = () => ({
  type: GET_SUMMARY_START
});

export const getSummarySuccess = payload => ({
  type: GET_SUMMARY_SUCCESS,
  payload
});

export const getSummaryFailure = payload => ({
  type: GET_SUMMARY_FAILURE,
  payload
});

export const getSummary = () => dispatch => {
  dispatch(getSummaryStart());
  const token = localStorage.getItem("token");
  getDataRequest("GetSummary", token)
    .then(response => {
      dispatch(getSummarySuccess(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(getSummaryFailure(error.response.data));
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        dispatch(getSummaryFailure("Something whent wrong"));
        toastError("Something whent wrong");
      }
    });
};

export const getUsersStart = () => ({
  type: GET_USERS_START
});

export const getUsersSuccess = payload => ({
  type: GET_USERS_SUCCESS,
  payload
});

export const getUsersFailure = payload => ({
  type: GET_USERS_FAILURE,
  payload
});

export const getUsers = () => dispatch => {
  dispatch(getUsersStart());
  const token = localStorage.getItem("token");
  getDataRequest("ListUsers", token)
    .then(response => {
      dispatch(getUsersSuccess(response.data));
    })
    .catch(error => {
      dispatch(getUsersFailure("Something whent wrong"));
      if (error.response.status === 401) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        toastError("Something whent wrong");
      }
    });
};

export const getNationalitiesStart = () => ({
  type: GET_NATIONALITIES_START
});

export const getNationalitiesSuccess = payload => ({
  type: GET_NATIONALITIES_SUCCESS,
  payload
});

export const getNationalitiesFailure = payload => ({
  type: GET_NATIONALITIES_FAILURE,
  payload
});

export const getNationalities = () => dispatch => {
  const token = localStorage.getItem("token");
  dispatch(getNationalitiesStart());
  getDataRequest("ListNationalities", token)
    .then(response => {
      dispatch(getNationalitiesSuccess(response.data));
    })
    .catch(error => {
      dispatch(getNationalitiesFailure("Something whent wrong"));
      if (error.response.status === 401) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        toastError("Something whent wrong");
      }
    });
};

export const getNationalitiesHash = payload => ({
  type: GET_NATIONALITIES_HASH,
  payload
});

export const getUserDetailsStart = () => ({
  type: GET_USER_DETAILS_START
});

export const getUserDetailsSuccess = payload => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload
});

export const getUserDetailsFailure = payload => ({
  type: GET_USER_DETAILS_FAILURE,
  payload
});

export const getUserDetails = userId => dispatch => {
  const token = localStorage.getItem("token");
  dispatch(getUserDetailsStart());
  getDataRequest(`GetUser/${userId}`, token)
    .then(response => {
      dispatch(getUserDetailsSuccess(response.data));
    })
    .catch(error => {
      dispatch(getUserDetailsFailure("Something whent wrong"));
      if (error.response.status === 401) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        toastError("Something whent wrong");
      }
    });
};

export const updateUserStart = () => ({
  type: UPDATE_USER_START
});

export const updateUserFinish = payload => ({
  type: UPDATE_USER_FINISH,
  payload
});

export const updateUser = (user, callback) => dispatch => {
  const token = localStorage.getItem("token");
  dispatch(updateUserStart());
  return axios({
    method: "put",
    url: `/Data/UpdateUser/${user.Id}`,
    data: user,
    headers: { SessionToken: token }
  })
    .then(response => {
      dispatch(getUsers());
      toastSuccess("The user us updated!");
      callback();
    })
    .catch(error => {
      dispatch(updateUserFinish());
      if (error.response.status === 401) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        toastError("Something went wrong");
      }
    });
};

export const getRanksStart = () => ({
  type: GET_RANKS_START
});

export const getRanksSuccess = payload => ({
  type: GET_RANKS_SUCCESS,
  payload
});

export const getRanksFailure = payload => ({
  type: GET_RANKS_FAILURE,
  payload
});

export const getRanks = () => dispatch => {
  const token = localStorage.getItem("token");
  dispatch(getRanksStart());
  getDataRequest("ListRanks", token)
    .then(response => {
      sessionStorage.setItem("ranks", JSON.stringify(response.data));
      dispatch(getRanksSuccess());
    })
    .catch(error => {
      dispatch(getRanksFailure());
      if (error.response.status === 401) {
        dispatch(logout(EXPIRED_SESSION_MESSAGE));
      } else {
        toastError("Something whent wrong");
      }
    });
};
