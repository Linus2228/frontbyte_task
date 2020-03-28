import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = ({ isUser, handleLogout }) => {
  return (
    <>
      <ul className="header">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isUser && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </ul>
    </>
  );
};

export default Header;
