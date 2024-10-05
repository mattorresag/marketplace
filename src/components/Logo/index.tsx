import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import DefaultLogo from "../../../public/assets/images/logos/default-logo.svg";
import WhiteLogo from "../../../public/assets/images/logos/white-logo.svg";
import BicolorLogo from "../../../public/assets/images/logos/bicolor-logo.svg";
import FullWhiteLogo from "../../../public/assets/images/logos/fullWhite.svg";

const Logo: FC<{
  height: number;
  alternative?: "default" | "white" | "bicolor" | "fullWhite";
  url?: string;
  className?: string;
}> = ({ height, alternative, url, className }) => {
  const [logoType, setLogoType] = useState(DefaultLogo);

  useEffect(() => {
    setLogoType(
      {
        default: DefaultLogo,
        white: WhiteLogo,
        bicolor: BicolorLogo,
        fullWhite: FullWhiteLogo,
      }[alternative || "default"]
    );
  }, [alternative]);
  return url ? (
    <Link href={url}>
      <a>
        <Image
          quality={100}
          unoptimized
          src={logoType}
          alt="ecommerce Logo"
          className={`my-4 ${className}`}
          height={height}
        />
      </a>
    </Link>
  ) : (
    <Image
      quality={100}
      unoptimized
      src={logoType}
      alt="ecommerce Logo"
      className={`my-4 ${className}`}
      height={height}
    />
  );
};

export default Logo;
