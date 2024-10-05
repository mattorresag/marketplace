import { IAuthContextUser } from "../../../interfaces/User";
import { api } from "../../axios/auth";

export const getUserData = async ({
  userId,
  token,
}: {
  userId: number;
  token?: string;
}): Promise<{ resources: IAuthContextUser }> => {
  const response = await api.get<{ resources: IAuthContextUser }>(
    `/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
