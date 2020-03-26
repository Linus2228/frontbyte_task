import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";

export const loginUser = user => ({
  type: LOGIN_USER,
  payload: user
});

export const userLoginFetch = user => dispatch => {
  return axios
    .post("/session/logon", user)
    .then(response => {
      localStorage.setItem("token", response.data.Token);
      dispatch(loginUser(user));
    })
    .catch(error => {
      console.log(error);
    });
};

export const getProfileFetch = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) {
    return axios
      .put(`/session/KeepAlive/${token}`)
      .then(response => {
        dispatch(loginUser(response.data.user));
      })
      .catch(error => {
        localStorage.removeItem("token");
        console.log(error);
      });
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const logout = () => dispatch => {
  const token = localStorage.getItem("token");
  return axios
    .delete(`/session/logout/${token}`)
    .then(response => {
      localStorage.removeItem("token");
      dispatch(logoutUser());
    })
    .catch(error => {
      console.log(error);
    });
};
