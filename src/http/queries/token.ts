import { getCookie } from "cookies-next";

export const token = () => {
  if (typeof window !== "undefined") {
    return getCookie("@ecommerce/authToken") as string;
  } else {
    return "";
  }
};
