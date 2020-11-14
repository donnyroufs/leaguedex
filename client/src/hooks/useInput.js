import { useState } from "react";

export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initialValue);

  const props = {
    value,
    onChange: handleChange,
  };

  return [value, props, reset];
}
