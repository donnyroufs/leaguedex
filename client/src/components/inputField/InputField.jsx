import React, { useRef } from "react";
import { Group, Input, Label } from "../../components/styles/Form";

const InputField = ({
  label,
  type = "text",
  placeholder = "enter text",
  name,
  handleChange,
  value,
}) => {
  const ref = useRef();

  const handleClick = (e) => {
    ref.current.focus();
  };

  return (
    <Group champion onClick={handleClick}>
      <Label>{label}</Label>
      <Input
        ref={ref}
        champion
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoComplete="off"
        name={name}
      />
    </Group>
  );
};

export default InputField;
