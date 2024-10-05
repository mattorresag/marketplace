import Image, { ImageProps, StaticImageData } from "next/image";
import { useEffect, useState } from "react";

interface Props extends ImageProps {
  fallbackSrc: string | StaticImageData;
}

export const ImageWithFallback = ({ src, fallbackSrc, ...rest }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      alt={rest.alt}
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
