import React from "react";

interface Props {
  label?: string;
  disabled?: boolean;
  className?: string;
  variant?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  style?: "link" | "ghost" | "glass" | "disabled";
  size?: "lg" | "md" | "sm" | "xs" | "wide";
  block?: boolean;
  shape?: "circle" | "square";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

export const Button = ({
  label,
  disabled = false,
  variant = "primary",
  className,
  style,
  size,
  block = true,
  shape,
  onClick,
  type = "button",
  children,
}: Props): JSX.Element => {
  const variantClasses = {
    neutral: "btn-neutral",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
  };

  const styleClasses = {
    link: "btn-link",
    ghost: "btn-ghost",
    glass: "btn-glass",
    disabled: "btn-disabled",
  };

  const sizeClasses = {
    lg: "btn-lg",
    md: "btn-md",
    sm: "btn-sm",
    xs: "btn-xs",
    wide: "btn-wide",
  };

  const shapeClasses = {
    circle: "btn-circle",
    square: "btn-square",
  };

  function getTailwindClasses() {
    const classes = [];

    if (variant && variantClasses[variant]) {
      classes.push(variantClasses[variant]);
    }

    if (style && styleClasses[style]) {
      classes.push(styleClasses[style]);
    }

    if (size && sizeClasses[size]) {
      classes.push(sizeClasses[size]);
    }

    if (block) {
      classes.push("btn-block");
    }

    if (shape && shapeClasses[shape]) {
      classes.push(shapeClasses[shape]);
    }

    return classes.join(" ");
  }

  const classes = getTailwindClasses();

  return (
    <button
      className={`btn ${classes} ${className ? className : ""}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className="text-white normal-case">{label}</span>
      {children}
    </button>
  );
};
