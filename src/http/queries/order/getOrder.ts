import { Order } from "../../../interfaces/Order";
import { api } from "../../axios/auth";

export const getOrder = async ({
  orderId,
  token,
}: {
  orderId: string;
  token?: string;
}): Promise<{ resources: Order }> => {
  const response = await api.get<{ resources: Order }>(`/orders/${orderId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
