import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { getOrders } from "../../queries/order/getOrders";
import { Order } from "../../../interfaces/Order";

export function useOrders({
  companyId,
  options,
}: {
  companyId: number;
  options?: UseQueryOptions<Order[], unknown, Order[], string[]>;
}): UseQueryResult<Order[]> {
  return useQuery(
    ["orders"],
    async () => getOrders({ token: token(), companyId }),
    options
  );
}
