import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  direction?: "col" | "row";
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: number | string;
  css?: React.CSSProperties;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}
export const Flex = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      direction = "row",
      align,
      justify,
      gap = 0,
      children,
      css,
      ...rest
    },
    ref
  ): JSX.Element => {
    const flexDirections = {
      row: "flex-row",
      col: "flex-col",
    };

    const justifyContent = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const alignItems = {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };

    function getTailwindClasses() {
      const classes = [];

      // Add flex direction class
      if (direction && flexDirections[direction]) {
        classes.push(flexDirections[direction]);
      }

      // Add justify class
      if (justify && justifyContent[justify]) {
        classes.push(justifyContent[justify]);
      }

      // Add align items class
      if (align && alignItems[align]) {
        classes.push(alignItems[align]);
      }

      return classes.join(" ");
    }

    const classes = getTailwindClasses();

    return (
      <div
        style={{ ...css }}
        ref={ref}
        className={`flex ${classes} ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
