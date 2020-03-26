import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
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
    window.localStorage.setItem(key, storedValue);
  }, [storedValue]);

  return [storedValue, setStoredValue];
};

export const useProtectRoute = () => {
  const isUser = !!useSelector(state => state.currentUser.User);
  const history = useHistory();
  useLayoutEffect(() => {
    if (!isUser) {
      history.push("/");
      alert("Please log in");
    }
  }, [isUser]);
};
