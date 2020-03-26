import React, { useState } from "react";

const initialUserData = {
  User: "Admin",
  Password: "Demo2020",
  Company: "DemoCompany"
};

const Login = props => {
  const [userData, setUserData] = useState(initialUserData);
  const { userLoginFetch } = props

  const handleInputChange = event => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = event => {
    event.preventDefault();
    userLoginFetch(userData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="input"
        name="Company"
        placeholder="Enter company name"
        value={userData.Company}
        onChange={handleInputChange}
        required
      />
      <input
        type="input"
        name="User"
        placeholder="Enter user name"
        value={userData.User}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="Password"
        placeholder="Enter password"
        value={userData.Password}
        onChange={handleInputChange}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
