import React from "react";
import { Flex } from "../Flex";
interface Props {
  handleValue: (value: string | number) => void;
  value: string | number;
  expectedValue: string | number;
  children: React.ReactNode;
  className?: string;
  background?: string;
}
export const Tab = ({
  handleValue,
  value,
  expectedValue,
  children,
  className = "tab rounded-md p-4 cursor-pointer text-primary-500 font-bold min-h-[76px]",
  background,
}: Props): JSX.Element => {
  return (
    <Flex
      onClick={() => handleValue(value)}
      align="center"
      className={className}
      style={{
        background: value === expectedValue ? "white" : background,
      }}
    >
      {children}
    </Flex>
  );
};
