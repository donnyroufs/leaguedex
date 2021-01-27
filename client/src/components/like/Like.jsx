import React from "react";
import * as SC from "./Like.styles.js";

export const Like = ({ onClick, likedByMe, likes }) => {
  console.log({ likedByMe });
  return (
    <SC.Container onClick={onClick}>
      <SC.Like likedByMe={!likedByMe} />
      <SC.LikeCount likedByMe={!likedByMe}>{likes}</SC.LikeCount>
    </SC.Container>
  );
};
