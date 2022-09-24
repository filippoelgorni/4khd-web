import React from "react";

export function Logo({
  logo,
  style,
  className,
}: {
  logo: "cyclobrowsing" | "4khd";
  style?: React.CSSProperties;
  className?: string;
}) {
  const url = `./../assets/${logo}.png`;

  return (
    <div style={style} className={className}>
      <img src={url} alt={logo} style={{ width: "inherit" }} />
    </div>
  );
}
