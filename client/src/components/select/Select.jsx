import React from "react";
import * as SC from "./Select.styles";

const Select = ({ value, onChange, options }) => {
  return (
    <SC.Select onChange={onChange} value={value}>
      {options.map((option) => (
        <SC.Option value={option.value} key={option.value}>
          {option.label}
        </SC.Option>
      ))}
    </SC.Select>
  );
};

export default Select;
