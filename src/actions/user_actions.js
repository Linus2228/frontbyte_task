import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";

let timer = null;

const clearUserDataInLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("companyName");
};

export const keepAlive = dispatch => {
  const token = localStorage.getItem("token");
  axios.put(`/session/KeepAlive/${token}`).catch(error => {
    if (error.response.data.ErrorCode === "InvalidSessionToken") {
      clearUserDataInLocalStorage();
      dispatch(logoutUser());
      if (timer) {
        clearInterval(timer);
        timer = null;
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
      timer = setInterval(() => {
        keepAlive(dispatch);
      }, 30000);
      localStorage.setItem("token", response.data.Token);
      localStorage.setItem("userName", user.User);
      localStorage.setItem("companyName", user.Company);
      dispatch(loginUser({ userName: user.User, companyName: user.Company }));
    })
    .catch(error => {
      console.log(error);
    });
};

export const keepAliveStart = dispatch => {
  const token = !!localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const companyName = localStorage.getItem("companyName");

  if (token) {
    dispatch(loginUser({ userName, companyName }));
    timer = setInterval(() => {
      keepAlive(dispatch);
    }, 30000);
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
      clearUserDataInLocalStorage();

      dispatch(logoutUser());
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    })
    .catch(error => {
      console.log(error);
    });
};
