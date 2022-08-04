import React from "react";

interface LikeProps {
  liked: boolean;
  onLike: () => void;
}

function Like({ liked, onLike }: LikeProps) {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return (
    <i
      onClick={onLike}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
