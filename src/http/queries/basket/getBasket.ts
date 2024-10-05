import { Basket } from "../../../interfaces/Offer";
import { api } from "../../axios/auth";

export const getBasket = async ({
  basketId,
  companyId,
  token,
}: {
  basketId: number;
  companyId: number;
  token?: string;
}): Promise<Basket> => {
  const response = await api.get<Basket>(
    `/basket/${basketId}/?client=${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
