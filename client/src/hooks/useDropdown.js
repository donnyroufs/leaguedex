import { useState } from "react";

export function useDropdown(handler) {
  const [show, setShow] = useState(false);

  const handleSetShow = (id) => {
    setShow((curr) => (curr === id ? null : id));
  };

  return {
    show,
    handleSetShow: handler || handleSetShow,
  };
}
