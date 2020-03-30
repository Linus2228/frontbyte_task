import React from "react";
import Select from "react-select";
import { useForm } from "../../hooks";
import { validateUserDetailsForm as validate } from "../../utils";

import "bulma/css/bulma.css";

const UserDetailsForm = ({ data, submitUser, rankIndex, nationalityIndex }) => {
  const { values, errors, handleChange, handleSelectChange, handleSubmit } = useForm(
    submitUser,
    validate,
    data
  );
  
  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-4 is-offset-3">
          <div className="box">
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="label">Name*</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    className={`input ${errors.Firstname && "is-danger"}`}
                    type="text"
                    name="Firstname"
                    onChange={handleChange}
                    value={values.Firstname || ""}
                    required
                  />
                  {errors.Firstname && (
                    <p className="help is-danger">{errors.Firstname}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Surname*</label>
                <div className="control">
                  <input
                    className={`input ${errors.Surname && "is-danger"}`}
                    type="text"
                    name="Surname"
                    onChange={handleChange}
                    value={values.Surname || ""}
                    required
                  />
                </div>
                {errors.Surname && (
                  <p className="help is-danger">{errors.Surname}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Nationality</label>
                <Select
                  options={values.nationalitiesOptions}
                  name="nationality"
                  onChange={option => handleSelectChange(option, "Nationality")}
                  isSearchable={true}
                  defaultValue={values.nationalitiesOptions[nationalityIndex]}
                />
              </div>
              <div className="field">
                <label className="label">Rank</label>
                <Select
                  options={values.rankOptions}
                  name="Rank"
                  onChange={option => handleSelectChange(option, "Rank")}
                  isSearchable={true}
                  defaultValue={values.rankOptions[rankIndex]}
                />
              </div>
              <div className="field">
                <label className="label">Birthday</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    name="DateOfBirth"
                    onChange={handleChange}
                    value={values.DateOfBirth || ""}
                    min="1961-01-01" 
                    max="2002-01-01"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    className="input"
                    type="address"
                    name="Address"
                    onChange={handleChange}
                    value={values.Address || ""}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Update user
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;
