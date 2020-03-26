import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isUser, handleLogout }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      {isUser && <button onClick={handleLogout}>Log Out</button>}
    </>
  );
};

export default Header;
