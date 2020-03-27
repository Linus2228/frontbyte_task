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
      localStorage.setItem("userName", user.User);
      localStorage.setItem("companyName", user.Company);
      dispatch(loginUser({ userName: user.User, companyName: user.Company }));
    })
    .catch(error => {
      console.log(error);
    });
};

export const getProfileFetch = () => dispatch => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const companyName = localStorage.getItem("companyName");

  if (token) {
    return axios
      .put(`/session/KeepAlive/${token}`)
      .then(response => {
        dispatch(loginUser({userName, companyName}));
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
      localStorage.removeItem("userName");
      localStorage.removeItem("companyName");
      dispatch(logoutUser());
    })
    .catch(error => {
      console.log(error);
    });
};
