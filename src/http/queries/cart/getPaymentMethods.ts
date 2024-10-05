import { PaymentMethod } from "../../../interfaces/BankData";
import { api } from "../../axios/auth";

export const getPaymentMethods = async ({
  token,
}: {
  token?: string;
}): Promise<PaymentMethod[]> => {
  const response = await api.get<PaymentMethod[]>(`/payment_method/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
