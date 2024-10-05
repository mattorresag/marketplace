import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { PaymentMethod } from "../../../interfaces/BankData";
import { getPaymentMethods } from "../../queries/cart/getPaymentMethods";

export function usePaymentMethods({
  options,
}: {
  options?: UseQueryOptions<
    PaymentMethod[],
    unknown,
    PaymentMethod[],
    string[]
  >;
}): UseQueryResult<PaymentMethod[]> {
  return useQuery(
    ["paymentMethods"],
    async () => getPaymentMethods({ token: token() }),
    options
  );
}
