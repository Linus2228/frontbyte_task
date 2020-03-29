import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const useProtectRoute = arrayOfActions => {
  const isUser = !!localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!isUser) {
      history.push("/");
      alert("Please login");
    } else {
      if (arrayOfActions) {
        arrayOfActions.forEach(action => dispatch(action));
      }
    }
  }, [isUser]);
};

export const useForm = (callback, validate, initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  const handleSelectChange = ({ value }, title) => {
    setValues(values => ({
      ...values,
      [title]: value
    }));
  }

  return {
    handleChange,
    handleSelectChange,
    handleSubmit,
    values,
    errors
  };
};
