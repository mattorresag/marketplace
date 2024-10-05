import jwt from "jsonwebtoken";
import { CookieUser, IAuthContextUser } from "../interfaces/User";

export const decodeToken = (token: string): CookieUser | null => {
  try {
    const decoded = jwt.decode(token);

    if (typeof decoded === "object" && decoded !== null) {
      return decoded as unknown as CookieUser;
    }

    return null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const authenticateUserServerSide = async (
  cookies: Partial<{
    [key: string]: string;
  }>
): Promise<IAuthContextUser | null> => {
  const token = cookies["@ecommerce/authToken"];
  if (!token) {
    return null;
  }
  try {
    const decoded = decodeToken(token);
    if (!decoded?.user) return null;
    return decoded.user;
  } catch (err) {
    return null;
  }
};
