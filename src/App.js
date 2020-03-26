import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileFetch, logout } from "./actions/user_actions";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";

const App = props => {
  const isUser = useSelector(state => state.currentUser.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileFetch());
  }, []);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      {isUser && (
        <button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log Out
        </button>
      )}

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
