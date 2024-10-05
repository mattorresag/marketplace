import React from "react";

interface SkeletonLoaderProps {
  type?: "text" | "circle" | "square";
  width?: string;
  height?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "text",
  width = "w-full",
  height = "h-4",
}) => {
  const baseClasses = `
  bg-primary-100/25
        animate-pulse
        rounded-md
        border-transparent
    `;

  const typeClasses: { [key: string]: string } = {
    text: `${width} ${height} border-b-4`,
    circle: `w-16 h-16 rounded-full border-4`,
    square: `w-16 h-16 border-4`,
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type] || typeClasses.text}`}
    ></div>
  );
};

export default SkeletonLoader;
