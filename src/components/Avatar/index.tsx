import Image from "next/image";
import React from "react";
interface Props {
  userName: string;
  image?: string;
  fallback?: string;
}
export const Avatar = ({ image = "", userName }: Props): JSX.Element => {
  return image ? (
    <div className="avatar">
      <div className="w-8 rounded-full">
        <Image src={image} alt="user-avatar" />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
        <span className="text-lg">{userName.at(0)}</span>
      </div>
    </div>
  );
};
