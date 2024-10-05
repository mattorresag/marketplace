import React from "react";
import { Flex } from "../../../components/Flex";
import SkeletonLoader from "../../../components/Skeleton";
import { Button } from "../../../components/Button";
import OfferLoading from "../OfferLoading";
import { SmallSlider } from "../../../components/Slider";

export const OfferCategorySkeleton = (): JSX.Element => {
  return (
    <Flex
      direction="col"
      className="gap-8 items-center lg:items-start"
      justify="center"
    >
      <Flex
        className="w-full flex-col gap-4 lg:flex-row"
        justify="between"
        align="center"
      >
        <SkeletonLoader height="h-[60px]" width="w-[50%]" />
        <Button variant="success" className="w-full lg:w-fit text-white">
          Adicionar ao carrinho
        </Button>
      </Flex>
      <SmallSlider options={{ dragFree: true }}>
        <Flex className="gap-4 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <OfferLoading key={index} />
          ))}
        </Flex>
      </SmallSlider>
    </Flex>
  );
};
