import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { setLanguage } from "../../actions/controls_actions";

const LanguageControl = () => {
  const { value } = useSelector(state => state.controls.lang);
  const dispatch = useDispatch();

  const handleChange = ({ target: { value } }) => dispatch(setLanguage(value));

  return (
    <RadioGroup
      row
      aria-label="position"
      name="lan"
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel
        value="eng"
        control={<Radio color="primary" />}
        label="eng"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="pol"
        control={<Radio color="primary" />}
        label="pol"
        labelPlacement="bottom"
      />
    </RadioGroup>
  );
};

export default LanguageControl;
