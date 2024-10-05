import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { token } from "../../queries/token";
import { getOffers } from "../../queries/offer/getOffers";
import { Offer } from "../../../interfaces/Offer";
import { AxiosPaginatingResponse } from "../../../interfaces/Axios";

export function useOffers({
  params,
  options,
  nextUrl,
}: {
  params?: { [key: string]: any };
  options?: UseQueryOptions<
    AxiosPaginatingResponse<Offer>,
    unknown,
    any,
    string[]
  >;
  nextUrl?: string;
}): UseQueryResult<AxiosPaginatingResponse<Offer>> {
  return useQuery(
    ["offers", `${params}`, `${nextUrl}`],
    async () =>
      getOffers({ token: token(), params, nextUrl }) as Promise<
        AxiosPaginatingResponse<Offer>
      >,
    options
  );
}
