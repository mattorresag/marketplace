import React from "react";
import { Flex } from "../Flex";
import { useRouter } from "next/router";
interface Props {
  url: string;
  icon?: React.ReactNode;
  description: string;
}
export const BaseCard = ({ url, icon, description }: Props): JSX.Element => {
  const router = useRouter();
  return (
    <Flex
      onClick={() => router.push(url)}
      direction="col"
      className="gap-4 w-full lg:w-[200px] h-[100px] text-primary-500 fill-primary-500 bg-secondary-500 
                  rounded-md p-4  border border-gray-300 shadow-md hover:transform 
                  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer "
    >
      {icon}
      <h3
        className="text-lg font-bold text-white text-shadow"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {description}
      </h3>
    </Flex>
  );
};
