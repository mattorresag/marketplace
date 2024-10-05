import React from "react";
type CircularProgressProps = {
  size?: number;
  className?: string;
  color?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 104,
  className = "",
  color = "#1a2d78",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M${size / 2} ${size * 0.1667}V${size * 0.0833}C${size * 0.4453} ${
          size * 0.0833
        } ${size * 0.391} ${size * 0.0941} ${size * 0.3402} ${size * 0.1149}C${
          size * 0.2894
        } ${size * 0.1358} ${size * 0.2439} ${size * 0.1667} ${size * 0.2054} ${
          size * 0.2054
        }C${size * 0.127} ${size * 0.2832} ${size * 0.0833} ${size * 0.3893} ${
          size * 0.0833
        } ${size / 2}H${size * 0.1667}C${size * 0.1667} ${size * 0.4112} ${
          size * 0.2016
        } ${size * 0.3264} ${size * 0.2639} ${size * 0.2639}C${size * 0.3264} ${
          size * 0.2016
        } ${size * 0.4112} ${size * 0.1667} ${size / 2} ${size * 0.1667}V${
          size * 0.1667
        }Z`}
        fill={color}
      />
    </svg>
  );
};

export default CircularProgress;
