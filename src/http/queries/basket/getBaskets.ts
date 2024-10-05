import { Basket } from "../../../interfaces/Offer";
import { api } from "../../axios/auth";

export const getBaskets = async ({
  companyId,
  token,
}: {
  companyId: number;
  token?: string;
}): Promise<Basket[]> => {
  const response = await api.get<Basket[]>(`/basket/?client=${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
