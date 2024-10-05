import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { Basket } from "../../../interfaces/Offer";
import { getBaskets } from "../../queries/basket/getBaskets";
import { token } from "../../queries/token";

export function useBaskets({
  companyId,
  options,
}: {
  companyId: number;
  options?: UseQueryOptions<Basket[], unknown, Basket[], string[]>;
}): UseQueryResult<Basket[]> {
  return useQuery(
    ["baskets", `${companyId}`],
    async () => getBaskets({ companyId, token: token() }),
    options
  );
}
