import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageControl from "../LanguageControl/LanguageControl";
import { HeaderInt } from "../../utils/int";

import "./header.css";

const Header = ({ isUser, handleLogout }) => {
  const lang = useSelector(state => state.controls.lang.value);
  const { home, dashboard, users, logout} = HeaderInt[lang];

  return (
    <div className="header-wrapper">
      <ul className="header">
        <li>
          <Link to="/">{home}</Link>
        </li>
        {isUser && (
          <>
            <li>
              <Link to="/dashboard">{dashboard}</Link>
            </li>
            <li>
              <Link to="/users">{users}</Link>
            </li>
            <button onClick={handleLogout}>{logout}</button>
          </>
        )}
      </ul>
      <LanguageControl />
    </div>
  );
};

export default Header;
