import axios from "axios";
import { logout } from "./authActions";
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
  return axios
    .get("/Data/GetSummary", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getSummarySuccess(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        dispatch(getSummaryFailure(error.response.data.ErrorMessage));
        // toaster(error.response.data.ErrorMessage)
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
  return axios
    .get("/Data/ListUsers", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getUsersSuccess(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        dispatch(getUsersFailure(error.response.data.ErrorMessage));
        // toaster(error.response.data.ErrorMessage)
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
  return axios
    .get("/Data/ListNationalities", { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getNationalitiesSuccess(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        dispatch(getNationalitiesFailure(error.response.data.ErrorMessage));
        // toaster(error.response.data.ErrorMessage)
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
  return axios
    .get(`/Data/GetUser/${userId}`, { headers: { SessionToken: token } })
    .then(response => {
      dispatch(getUserDetailsSuccess(response.data));
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        dispatch(getUserDetailsFailure(error.response.data.ErrorMessage));
        // toaster(error.response.data.ErrorMessage)
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
    method: 'put',
    url: `/Data/UpdateUser/${user.Id}`,
    data: user,
    headers: { SessionToken: token }
  })
    .then(response => {
      dispatch(getUsers());
      // toaster("You updated the user successfully")
      callback();
    })
    .catch(error => {
      dispatch(updateUserFinish());
      
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        // toaster(error.response.data.ErrorMessage)
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
  return axios
    .get("/Data/ListRanks/", { headers: { SessionToken: token } })
    .then(response => {
      sessionStorage.setItem( "ranks", JSON.stringify( response.data ) );
      dispatch(getRanksSuccess());
    })
    .catch(error => {
      dispatch(getRanksFailure());
      if (error.response.status === 401) {
        dispatch(logout());
        // toaster("Please login again")
      } else {
        // toaster(error.response.data.ErrorMessage)
      }
    });
};
