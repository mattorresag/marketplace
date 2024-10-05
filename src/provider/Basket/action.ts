import { CartItem } from "../../interfaces/Cart";
import { Basket } from "../../interfaces/Offer";
import { MultiBasketActions, MultiBasketTypes } from "./reducer";

export const getMultiBasketsItems = (
  payload: Record<string, Basket>
): MultiBasketActions => ({
  type: MultiBasketTypes.GET_BASKETS,
  payload,
});

export const replaceOfferInMultiBasket = (payload: {
  basketId: number;
  oldOffer: CartItem;
  newOffer: CartItem;
}): MultiBasketActions => ({
  type: MultiBasketTypes.REPLACE_OFFER_IN_BASKET,
  payload,
});

export const removeOfferFromMultiBasket = (payload: {
  basketId: number;
  offerId: number;
}): MultiBasketActions => ({
  type: MultiBasketTypes.REMOVE_OFFER_FROM_BASKET,
  payload,
});

export const addOfferToMultiBasket = (payload: {
  basketId: number;
  offer: CartItem;
}): MultiBasketActions => ({
  type: MultiBasketTypes.ADD_OFFER_TO_BASKET,
  payload,
});
