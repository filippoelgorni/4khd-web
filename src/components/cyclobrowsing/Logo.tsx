import React from "react";

export function Logo({
  logo,
  style,
  className,
  onClick,
}: {
  logo: "cyclobrowsing" | "4khd";
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  const url = `./../assets/${logo}.png`;

  return (
    <div style={style} className={className} onClick={onClick}>
      <img src={url} alt={logo} style={{ width: "inherit" }} />
    </div>
  );
}
