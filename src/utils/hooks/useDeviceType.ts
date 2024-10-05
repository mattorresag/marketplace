import useMediaQuery from "./useMediaQuery";

export const useDeviceType = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  return { isDesktop, isTablet };
};
