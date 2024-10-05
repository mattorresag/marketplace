import React from "react";
import { Controller } from "react-hook-form";
import { Flex } from "../Flex";
import { TextField } from "../TextField";

type FormTextFieldProps = {
  control: any;
  name: string;
  placeholder?: string;
  type?: string;
  errors: Record<string, any>;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
};

const FormTextField: React.FC<FormTextFieldProps> = ({
  control,
  name,
  placeholder,
  type = "text",
  errors,
  label,
  className,
  icon,
  ...props
}) => {
  return (
    <Flex direction="col" className="gap-1">
      {label && (
        <label
          htmlFor={name}
          className="font-source-sans-pro font-semibold mb-2"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            name={name}
            type={type}
            placeholder={placeholder}
            {...props}
            className={`input border rounded-lg shadow-md  ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } ${className}`}
            errors={errors}
            field={field}
          />
        )}
      />
      {errors[name] && (
        <span className="mt-1 text-xs text-red-500">
          {errors[name].message}
        </span>
      )}
    </Flex>
  );
};

export default FormTextField;
