import React from "react";

export function Logo({ style }: { style?: React.CSSProperties }) {
  const url = "./../assets/logo.jpg";

  return (
    <div style={style}>
      <img src={url} alt="4kHD" style={{ width: "inherit" }} />
    </div>
  );
}
