import { FC } from "react";
import Logo from "../Logo";
import PageMeta from "../PageMeta";

const PageLoading: FC = () => (
  <>
    <PageMeta />
    <div className="loading-wrapper h-full w-full flex flex-col items-center justify-center">
      <Logo height={84} />
      <svg
        width="104"
        height="104"
        viewBox="0 0 104 104"
        fill="none"
        className=" my-6 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M52 17.3333V8.66667C46.3094 8.66667 40.6745 9.78752 35.417 11.9652C30.1596 14.1429 25.3826 17.3348 21.3587 21.3587C13.2321 29.4853 8.66666 40.5073 8.66666 52H17.3333C17.3333 42.8058 20.9857 33.9882 27.487 27.487C33.9882 20.9857 42.8058 17.3333 52 17.3333V17.3333Z"
          fill="#1a2d78"
        />
      </svg>
    </div>
  </>
);
export default PageLoading;
