import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../actions/authActions";
import LoginForm from "./LoginForm";
import { HomeInt } from "../../utils/int";

const Home = props => {
  const userName = useSelector(state => state.auth.currentUser.userName);
  const lang = useSelector(state => state.controls.lang.value);
  const dispatch = useDispatch();

  const { greeting, desc, login } = HomeInt[lang];

  return (
    <div>
      {userName ? (
        <h1> {greeting(userName)} </h1>
      ) : (
        <>
          <h1>{desc}</h1>
          <h1>{login}</h1>
          <LoginForm
            userLogin={userInfo => {
              dispatch(userLogin(userInfo));
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
