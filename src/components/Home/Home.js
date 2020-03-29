import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoginFetch } from "../../actions/user_actions";
import LoginForm from "./LoginForm";

const Home = props => {
  const userName = useSelector(state => state.currentUser.userName);
  const dispatch = useDispatch();

  return (
    <div>
      {userName ? (
        <h1>Welcome, {userName}! </h1>
      ) : (
        <>
          <h1>Your awesome app!</h1>
          <h1>Please login</h1>
          <LoginForm userLoginFetch={userInfo => {dispatch(userLoginFetch(userInfo))}} />
        </>
      )}
    </div>
  );
};

export default Home;
