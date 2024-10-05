import React, { useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { Flex } from "../Flex";
import ChevronLeft from "/public/assets/images/icons/chevronLeft.svg?svgr";
import ChevronRight from "/public/assets/images/icons/chevronRight.svg?svgr";

interface Props {
  children: React.ReactNode;
  callback?: (value?: any) => void;
  align?: "center" | "start";
  className?: string;
  options?: EmblaOptionsType;
  showArrows?: boolean;
}

export const SmallSlider = ({
  children,
  callback,
  align = "start",
  options,
  className,
  showArrows = false,
}: Props): JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    breakpoints: {
      "(min-width: 1024px)": { align: "start" },
    },
    ...options,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    if (emblaApi && showArrows) {
      // Update button states whenever the carousel state changes
      const onSelect = () => {
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
      };
      onSelect();
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
        return void 0; // Explicitly return void
      };
    }
  }, [emblaApi, showArrows]);

  return (
    <div
      className={`relative ${className} max-w-[calc(100vw-32px)] w-[1120px]`}
    >
      <Flex
        ref={emblaRef}
        className={`cursor-pointer overflow-hidden w-full ${
          showArrows && "px-12"
        }`}
        onClick={() => {
          callback?.();
        }}
      >
        {children}
      </Flex>
      {showArrows && (
        <>
          <button
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!prevBtnEnabled}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <ChevronLeft
              className="text-primary-500"
              height="3rem"
              width="3rem"
            />
          </button>
          <button
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!nextBtnEnabled}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          >
            <ChevronRight
              className="text-primary-500"
              height="3rem"
              width="3rem"
            />
          </button>
        </>
      )}
    </div>
  );
};
