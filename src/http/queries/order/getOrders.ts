import { Order } from "../../../interfaces/Order";
import { api } from "../../axios/auth";

export const getOrders = async ({
  companyId,
  token,
}: {
  companyId: number;
  token?: string;
}): Promise<Order[]> => {
  const response = await api.get<Order[]>(`/order/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      client: companyId,
    },
  });

  return response.data;
};
