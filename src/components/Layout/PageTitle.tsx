import React from "react";
import { Flex } from "../Flex";
interface Props {
  title: string;
}
export const PageTitle = ({ title }: Props): JSX.Element => {
  return (
    <>
      <Flex justify="center">
        <h1 className="text-center text-4xl lg:text-start lg:text-5xl font-bold text-primary-500">
          {title}
        </h1>
      </Flex>
      <div className="divider" />
    </>
  );
};
