import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
  }, [storedValue]);

  return [storedValue, setStoredValue];
};

export const useProtectRoute = action => {
  const isUser = !!localStorage.getItem("token");
  const history = useHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!isUser) {
      history.push("/");
      alert("Please log in");
    } else {
      action && dispatch(action());
    }
  }, [isUser]);
};
