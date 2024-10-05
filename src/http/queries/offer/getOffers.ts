import { AxiosPaginatingResponse } from "../../../interfaces/Axios";
import { Offer } from "../../../interfaces/Offer";
import { api } from "../../axios/auth";

export const getOffers = async ({
  token,
  params = {
    limit: 10,
  },
  nextUrl,
}: {
  token?: string;
  params?: { [key: string]: any };
  nextUrl?: string;
}): Promise<AxiosPaginatingResponse<Offer> | Offer[]> => {
  const apiUrl = nextUrl || "/offer/";
  const response = await api.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data;
};
