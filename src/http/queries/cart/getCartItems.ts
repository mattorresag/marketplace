import { CartItem } from "../../../interfaces/Cart";
import { api } from "../../axios/auth";

export const getCartItems = async ({
  token,
  companyId,
}: {
  companyId: number;
  token?: string;
}): Promise<{ resources: CartItem[] }> => {
  const response = await api.get<{ resources: CartItem[] }>(
    `/cart/${companyId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
