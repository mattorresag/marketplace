import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Basket } from "../../../interfaces/Offer";
import { getBasket } from "../../queries/basket/getBasket";
import { token } from "../../queries/token";

export function useBasket({
  basketId,
  companyId,
  options,
}: {
  basketId: number;
  companyId: number;
  options?: UseQueryOptions<Basket, unknown, Basket, string[]>;
}): UseQueryResult<Basket> {
  return useQuery(
    ["basket", `${companyId}`, `${basketId}`],
    async () => getBasket({ companyId, basketId, token: token() }),
    options
  );
}
