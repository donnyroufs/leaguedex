import React from "react";
import * as SC from "./RowsLayout.styles";

const RowsLayout = ({ header, body }) => {
  return (
    <SC.Container>
      <SC.Header>{header}</SC.Header>
      <SC.Body>{body}</SC.Body>
    </SC.Container>
  );
};

export default RowsLayout;
