import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { getPaymentConditions } from "../../queries/cart/getPaymentConditions";
import { PaymentCondition } from "../../../interfaces/BankData";

export function usePaymentConditions({
  options,
}: {
  options?: UseQueryOptions<
    PaymentCondition[],
    unknown,
    PaymentCondition[],
    string[]
  >;
}): UseQueryResult<PaymentCondition[]> {
  return useQuery(
    ["paymentConditions"],
    async () => getPaymentConditions({ token: token() }),
    options
  );
}
