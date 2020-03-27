import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";

let timer = null;

const keepAlive = dispatch => {
  const token = localStorage.getItem("token");
  axios
    .put(`/session/KeepAlive/${token}`)
    .catch(error => {
      if (error.response.data.ErrorCode === 'InvalidSessionToken') {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("companyName");
        dispatch(logoutUser());
        if (timer) {
          clearInterval(timer);
          timer = null
        }
      }
    });
};

export const loginUser = user => ({
  type: LOGIN_USER,
  payload: user
});

export const userLoginFetch = user => dispatch => {
  return axios
    .post("/session/logon", user)
    .then(response => {
      timer = setInterval(() => {keepAlive(dispatch)}, 5000);
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
        dispatch(loginUser({ userName, companyName }));
      })
      .catch(error => {
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
      if (timer) {
        clearInterval(timer);
        timer = null
      }
    })
    .catch(error => {
      console.log(error);
    });
};
