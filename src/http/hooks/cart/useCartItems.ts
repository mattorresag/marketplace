import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getCartItems } from "../../queries/cart/getCartItems";
import { CartItem } from "../../../interfaces/Cart";
import { token } from "../../queries/token";

export function useCartItems({
  companyId,
  options,
}: {
  companyId: number;
  options?: UseQueryOptions<
    { resources: CartItem[] },
    unknown,
    { resources: CartItem[] },
    string[]
  >;
}): UseQueryResult<{ resources: CartItem[] }> {
  return useQuery(
    ["cart", `${companyId}`],
    async () => getCartItems({ companyId, token: token() }),
    options
  );
}
