import { Offer } from "../../../interfaces/Offer";
import { api } from "../../axios/auth";

export const getOffer = async ({
  token,
  offerId,
}: {
  offerId: string;
  token?: string;
}): Promise<Offer> => {
  const response = await api.get<Offer>(`/offer/${offerId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
