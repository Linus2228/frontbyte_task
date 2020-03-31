import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

var circularStyle = {
  width: 100,
  margin: "30px auto 0"
};

export const CircularLoader = () => (
  <div style={circularStyle}>
    <CircularProgress size={80} />
  </div>
);
