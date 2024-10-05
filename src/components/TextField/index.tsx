import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form/dist/types";
import { Flex } from "../Flex";
interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errors?: Record<string, any>;
  field?: ControllerRenderProps<FieldValues, string>;
  icon?: React.ReactNode;
}
export const TextField = ({
  name,
  type,
  placeholder,
  className,
  errors,
  field,
  icon,
  ...props
}: Props): JSX.Element => {
  return (
    <div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`input border rounded-lg shadow-md  ${
          errors?.[name] ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...field}
      />
      {icon && (
        <Flex className="absolute inset-y-0 right-3" align="center">
          {icon}
        </Flex>
      )}
    </div>
  );
};
