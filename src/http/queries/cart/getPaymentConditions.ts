import { PaymentCondition } from "../../../interfaces/BankData";
import { api } from "../../axios/auth";

export const getPaymentConditions = async ({
  token,
}: {
  token?: string;
}): Promise<PaymentCondition[]> => {
  const response = await api.get<PaymentCondition[]>(`/payment_condition/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
