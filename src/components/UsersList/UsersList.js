import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useProtectRoute } from "../../hooks";
import {
  getUsersFetch,
  getNationalitiesFetch
} from "../../actions/company_actions";
import UsersTable from "./UsersTable";

const nationalitiesHash = {};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const fetchedUsers = useSelector(state => state.company.users);
  const nationalities = useSelector(state => state.company.nationalities);
  const shouldDisplay = fetchedUsers.length !== 0 && nationalities.length !== 0;

  useProtectRoute([getUsersFetch, getNationalitiesFetch]);

  if (!shouldDisplay) return <h3>No users to display</h3>;

  const findNationalityObject = code => {
    const nationalityObject = nationalities.find(item => item.Id === code);
    nationalitiesHash[code] = nationalityObject;
    return nationalityObject;
  };

  const users = fetchedUsers
    .filter(user => user.Firstname.toLowerCase().includes(search.toLowerCase()))
    .map(user => {
      const nationalityCode = user.Nationality;
      const nationalityObject =
        nationalitiesHash[nationalityCode] ||
        findNationalityObject(nationalityCode);
      const { Name, Order } = nationalityObject;
      return { ...user, NationalityName: Name, Order };
    })
    .sort((a, b) => a.Order - b.Order);

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
      <UsersTable users={users} search={search} />
    </div>
  );
};

export default Dashboard;
