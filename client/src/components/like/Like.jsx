import React from "react";
import * as SC from "./Like.styles.js";

export const Like = ({ onClick, likedByMe }) => {
  return <SC.Like onClick={onClick} likedByMe={!likedByMe} />;
};
