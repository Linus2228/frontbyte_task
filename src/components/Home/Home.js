import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoginFetch } from "../../actions/user_actions";
import LoginForm from "./LoginForm";

const Home = props => {
  const isUser = !!useSelector(state => state.currentUser.userName);
  const dispatch = useDispatch();

  return (
    <div>
      {isUser ? (
        <h1>You are logged in! </h1>
      ) : (
        <>
          <h1>Please log in</h1>
          <LoginForm userLoginFetch={userInfo => {dispatch(userLoginFetch(userInfo))}} />
        </>
      )}
    </div>
  );
};

export default Home;
