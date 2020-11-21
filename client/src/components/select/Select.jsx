import React, { useState } from "react";
import * as SC from "./Select.styles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Select = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  return (
    <SC.Wrapper onClick={() => setOpen(curr => !curr)}>
      <SC.Select onChange={onChange} value={value}>
        {options.map((option) => (
          <SC.Option value={option.value} key={option.value}>
            {option.label}
          </SC.Option>
        ))}
      </SC.Select>
      <SC.ArrowWrapper>
        {!open && <FaChevronDown />}
        {open && <FaChevronUp />}
      </SC.ArrowWrapper>
    </SC.Wrapper>
  );
};

export default Select;
