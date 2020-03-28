import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { keepAliveStart, logout } from "./actions/user_actions";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import UsersList from "./components/UsersList/UsersList";
import NotFound from "./components/NotFound/NotFound";

const App = props => {
  const isUser = useSelector(state => state.currentUser.userName);
  const dispatch = useDispatch();

  useEffect(() => {
    keepAliveStart(dispatch);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Header isUser={isUser} handleLogout={handleLogout} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UsersList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
