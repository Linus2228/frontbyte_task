import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProtectRoute } from "../../hooks";
import {
  getUsersFetch,
  getNationalities,
  getNationalitiesHash
} from "../../actions/company_actions";
import UsersTable from "./UsersTable";
import { UsersListInt } from "../../utils/int";

const initialNationalitiesHash = {};

const UsersList = () => {
  const [search, setSearch] = useState("");
  const fetchedUsers = useSelector(state => state.company.users);
  const { data: nationalities } = useSelector(
    state => state.company.nationalities
  );
  const isNationalities = nationalities.length !== 0;
  const isFetchedUsers = fetchedUsers.length !== 0;
  const nationalitiesHash = useSelector(
    state => state.company.nationalitiesHash
  );
  const lang = useSelector(state => state.controls.lang.value);
  const { title, searchTitle } = UsersListInt[lang];

  const dispatch = useDispatch();
  const shouldDisplay = fetchedUsers.length !== 0 && nationalities.length !== 0;
  const isNationalitiesHash = Object.keys(nationalitiesHash).length !== 0;

  const getActions = () => {
    const actions = [];
    if (!isNationalities) {
      actions.push(getNationalities());
    }
    if (!isFetchedUsers) {
      actions.push(getUsersFetch());
    }
    return actions;
  };

  useProtectRoute(getActions());

  if (!shouldDisplay) return <h3>No users to display</h3>;

  const getNationalityObject = code => {
    const nationalityObject = nationalities.find(item => item.Id === code);
    initialNationalitiesHash[code] = nationalityObject;
    return nationalityObject;
  };

  const users = fetchedUsers
    .filter(user => user.Firstname.toLowerCase().includes(search.toLowerCase()))
    .map((user, index, array) => {
      const nationalityCode = user.Nationality;
      const nationalityObject = isNationalitiesHash
        ? nationalitiesHash[nationalityCode]
        : initialNationalitiesHash[nationalityCode] ||
          getNationalityObject(nationalityCode);

      if (index === array.length - 1 && !isNationalitiesHash) {
        dispatch(getNationalitiesHash(initialNationalitiesHash));
      }
      const { Name, Order } = nationalityObject;
      return { ...user, NationalityName: Name, Order };
    })
    .sort((a, b) => a.Order - b.Order);

  return (
    <div>
      <h1>{title}</h1>
      <label>
        {searchTitle}
        <input
          type="text"
          name="name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <UsersTable users={users} search={search} lang={lang} />
    </div>
  );
};

export default UsersList;
