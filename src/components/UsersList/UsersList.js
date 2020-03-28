import React from "react";
import { useSelector } from "react-redux";
import { useProtectRoute } from "../../hooks";
import { getUsersFetch } from "../../actions/company_actions";
import UsersTable from "./UsersTable";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const users = useSelector(state => state.company.users);
  const isUsers = users.length !== 0;

  useProtectRoute(getUsersFetch);

  if (!isUsers) return <h3>No users to display</h3>;

  const filteredUsers = users.filter(user =>
    user.Firstname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Users list</h1>
      <label>
        Search name:
        <input
          type="text"
          name="name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <UsersTable users={filteredUsers} />
    </div>
  );
};

export default Dashboard;
