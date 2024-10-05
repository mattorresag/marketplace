import { Company } from "../../../interfaces/User";
import { api } from "../../axios/auth";

export const getUserCompanies = async ({
  token,
}: {
  token: string;
}): Promise<{ resources: Company[] }> => {
  const response = await api.get<{ resources: Company[] }>(`/client/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
