import React from "react";
import { useAuth } from "../../hooks/useAuth.js";
import * as SC from "./Like.styles.js";

export const Like = ({ onClick, likedByMe, likes }) => {
  const { user } = useAuth();

  return (
    <SC.Container onClick={onClick} user={!!user}>
      <SC.Like likedByMe={!likedByMe} />
      <SC.LikeCount likedByMe={!likedByMe}>{likes}</SC.LikeCount>
    </SC.Container>
  );
};
