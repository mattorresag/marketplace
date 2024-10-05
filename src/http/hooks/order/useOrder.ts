import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { Order } from "../../../interfaces/Order";
import { getOrder } from "../../queries/order/getOrder";

export function useOrder({
  orderId,
  options,
}: {
  orderId: string;
  options?: UseQueryOptions<
    { resources: Order },
    unknown,
    { resources: Order },
    string[]
  >;
}): UseQueryResult<{ resources: Order }> {
  return useQuery(
    ["orders"],
    async () => getOrder({ token: token(), orderId }),
    options
  );
}
