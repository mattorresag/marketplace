import React from "react";
import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";
import { useDeviceType } from "../../../utils/hooks/useDeviceType";
import { Flex } from "../../../components/Flex";
import { ImageWithFallback } from "../../../components/ImageWithFallback";
import SkeletonLoader from "../../../components/Skeleton";

export const OfferDetailsSkeleton = (): JSX.Element => {
  const { isDesktop, isTablet } = useDeviceType();
  return (
    <Flex
      className="gap-2 mt-5  min-h-[480px] w-full"
      direction={isTablet ? "row" : "col"}
    >
      <Flex
        direction={isDesktop ? "row" : "col"}
        className="bg-white rounded-lg shadow-sm w-full md:w-[50%] lg:w-[65%] p-12"
      >
        <Flex
          className="relative p-8 w-full lg:w-[50%]"
          justify="center"
          align="center"
        >
          <ImageWithFallback
            fallbackSrc={SampleProductImage}
            src={SampleProductImage}
            alt="loading-offer"
            objectFit="contain"
            layout={isDesktop ? "fill" : "fixed"}
          />
        </Flex>
        <Flex direction="col" className="gap-2 p-12 w-full">
          <SkeletonLoader />
          <SkeletonLoader />
          <div className="divider" />

          <SkeletonLoader />

          <SkeletonLoader />
          <SkeletonLoader />
        </Flex>
      </Flex>
      <Flex
        direction="col"
        className="gap-2 bg-white rounded-lg shadow-sm p-12 w-full md:w-[50%] lg:w-[35%]"
      >
        <SkeletonLoader />
        <Flex align="center" className="mt-2">
          <SkeletonLoader />
        </Flex>
        <SkeletonLoader />
        <div className="divider" />
        <SkeletonLoader />
        <SkeletonLoader />
        <div className="divider" />
        <div className="mt-9 mb-3">
          <SkeletonLoader />
        </div>
        <SkeletonLoader />
      </Flex>
    </Flex>
  );
};
