import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import UserDetailsForm from "./UserDetailsForm";
import { CircularLoader as Loader } from "../Loaders";
import {
  getUserDetails,
  updateUser,
  getNationalities,
  getRanks
} from "../../actions/companyActions";
import { useProtectRoute } from "../../hooks";
import { UserDetailsInt } from "../../utils/int";

const handleDate = date => {
  const array = moment(date)
    .format("L")
    .split("/")
    .reverse();
  array.splice(1, 0, array[2]);
  array.pop();
  return array.join("-");
};

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: userDetails, loading: isUserDetailsLoading } = useSelector(
    state => state.company.userDetails
  );
  const { data: nationalities, loading: isNationalitiesLoading } = useSelector(
    state => state.company.nationalities
  );
  const { loading: isRanksLoading } = useSelector(state => state.company.ranks);
  const ranks = JSON.parse(sessionStorage.getItem("ranks"));

  const lang = useSelector(state => state.controls.lang.value);

  const isUserDetails = Object.keys(userDetails).length !== 0;
  const isNationalities = nationalities.length !== 0;
  const isRanks = ranks && ranks.length !== 0;

  const getActions = () => {
    const actions = [getUserDetails(id)];
    if (!isNationalities) {
      actions.push(getNationalities());
    }
    if (!isRanks) {
      actions.push(getRanks());
    }
    return actions;
  };

  useProtectRoute(getActions());

  const getRankOptions = () =>
    ranks
      .map(rank => ({ ...rank }))
      .sort((a, b) => a.Order - b.Order)
      .map(rank => ({ value: rank.Id, label: rank.Name }));

  const getNationalitiesOptions = () =>
    nationalities
      .map(nationality => ({ ...nationality }))
      .sort((a, b) => a.Order - b.Order)
      .map(nationality => ({ value: nationality.Id, label: nationality.Name }));

  const navigateToUsers = () => history.push("/users");

  const submitUser = updatedUser => {
    const data = {
      Id: updatedUser.Id,
      Firstname: updatedUser.Firstname,
      Surname: updatedUser.Surname,
      Nationality: updatedUser.Nationality,
      Rank: updatedUser.Rank,
      Dateofbirth: updatedUser.DateOfBirth,
      Address: updatedUser.Address
    };
    dispatch(updateUser(data, navigateToUsers));
  };

  const isLoaderShow =
    !isUserDetails ||
    isUserDetailsLoading ||
    !isNationalities ||
    isNationalitiesLoading ||
    !isRanks ||
    isRanksLoading;

  if (isLoaderShow) return <Loader />;

  const { Rank, DateOfBirth, Nationality } = userDetails;
  const wordingInt = UserDetailsInt[lang];

  const dateOfBirth = handleDate(DateOfBirth);

  const rankOptions = getRankOptions();
  const rankIndex = rankOptions.findIndex(rank => rank.value === Rank);

  const nationalitiesOptions = getNationalitiesOptions();
  const nationalityIndex = nationalitiesOptions.findIndex(
    nationality => nationality.value === Nationality
  );

  const data = {
    ...userDetails,
    DateOfBirth: dateOfBirth,
    rankOptions,
    nationalitiesOptions
  };

  return (
    <UserDetailsForm
      data={data}
      submitUser={submitUser}
      rankIndex={rankIndex}
      nationalityIndex={nationalityIndex}
      wordingInt={wordingInt}
    />
  );
};

export default UserDetails;
