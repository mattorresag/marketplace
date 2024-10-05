import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { Offer } from "../../../interfaces/Offer";
import { getOffer } from "../../queries/offer/getOffer";

export function useOffer({
  offerId,
  options,
}: {
  offerId: string;
  options?: UseQueryOptions<Offer, unknown, Offer, string[]>;
}): UseQueryResult<Offer> {
  return useQuery(
    ["offers", `${offerId}`],
    async () => getOffer({ token: token(), offerId }),
    options
  );
}
