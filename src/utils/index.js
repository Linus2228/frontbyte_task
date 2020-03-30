export const validateUserDetailsForm = values => {
  const errors = {};
  if (!values.Firstname) {
    errors.Firstname = "Name is required";
  } else if (values.Firstname.length < 3) {
    errors.Firstname = "At least 3 characters";
  }
  if (!values.Surname) {
    errors.Surname = "Surname is required";
  } else if (values.Surname.length < 3) {
    errors.Surname = "At least 3 characters";
  }
  return errors;
};

export const clearUserDataInLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("companyName");
};
