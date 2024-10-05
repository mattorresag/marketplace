import { FC } from "react";

const OfferLoading = () => (
  <div
    className="       bg-white
rounded-lg
min-w-[226px] w-full lg:w-[226px]
pt-4
md:pt-2
pb-4
px-4
shadow-sm
flex
flex-col"
  >
    <div
      className="       py-12
      px-12
      bg-primary-100/25
      animate-pulse
      mr-3
      md:w-full
      md:my-3"
    >
      <div className="productLoading-image-inner" />
    </div>
    <div
      className="       flex
      flex-col
      py-2
      md:py-4
      w-full"
    >
      <div
        className="       bg-primary-100/25
      animate-pulse
      py-2
      w-full"
      />
      <div
        className="       bg-primary-100/25
      animate-pulse
      py-2
      w-full
      my-3"
      />
      <div
        className="       bg-primary-100/25
      animate-pulse
      py-4
      w-full
      my-2"
      >
        <div className="productLoading-button-inner" />
      </div>
      <div
        className="       bg-primary-100/25
      animate-pulse
      py-2
      w-full
      my-3"
      >
        <div className="productLoading-cheaper-inner" />
      </div>
    </div>
  </div>
);

export default OfferLoading;
