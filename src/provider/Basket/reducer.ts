import { Action, ActionMap } from "../../interfaces/Action";
import { CartItem } from "../../interfaces/Cart";
import { Basket } from "../../interfaces/Offer";
import { MultiBasketState } from "./MultiBasketsProvider";

export enum MultiBasketTypes {
  GET_BASKETS = "GET_BASKETS",
  REMOVE_OFFER_FROM_BASKET = "REMOVE_OFFER_FROM_BASKET",
  ADD_OFFER_TO_BASKET = "ADD_OFFER_TO_BASKET",
  REPLACE_OFFER_IN_BASKET = "REPLACE_OFFER_IN_BASKET",
}

type MultiBasketPayloads = {
  [MultiBasketTypes.GET_BASKETS]: Record<string, Basket>;
  [MultiBasketTypes.REMOVE_OFFER_FROM_BASKET]: {
    basketId: number;
    offerId: number;
  };
  [MultiBasketTypes.ADD_OFFER_TO_BASKET]: {
    basketId: number;
    offer: CartItem;
  };
  [MultiBasketTypes.REPLACE_OFFER_IN_BASKET]: {
    basketId: number;
    oldOffer: CartItem;
    newOffer: CartItem;
  };
};

export type MultiBasketActions =
  ActionMap<MultiBasketPayloads>[keyof ActionMap<MultiBasketPayloads>];

export const multiBasketsReducer = (
  state: MultiBasketState,
  action: Action
): MultiBasketState => {
  switch (action.type) {
    case MultiBasketTypes.GET_BASKETS:
      return {
        baskets: action.payload,
      };
    case MultiBasketTypes.REPLACE_OFFER_IN_BASKET: {
      const basket = state.baskets[action.payload.basketId];

      if (!basket) return state;

      const updatedOffers = basket.offers_list.map((offer) => {
        if (offer.id === action.payload.oldOffer.id) {
          return action.payload.newOffer;
        }
        return offer;
      });

      return {
        ...state,
        baskets: {
          ...state.baskets,
          [action.payload.basketId]: {
            ...basket,
            offers_list: updatedOffers,
          },
        },
      };
    }
    case MultiBasketTypes.ADD_OFFER_TO_BASKET: {
      const basket = state.baskets[action.payload.basketId];
      if (!basket) return state; // or handle error

      const offerIndex = basket.offers_list.findIndex(
        (offer) => offer.id === action.payload.offer.id
      );

      let updatedOffers;
      if (offerIndex !== -1) {
        updatedOffers = [...basket.offers_list];

        const newOfferQuantity = action.payload.offer?.quantity || 1;

        updatedOffers[offerIndex].quantity = newOfferQuantity;
      } else {
        updatedOffers = [...basket.offers_list, action.payload.offer];
      }

      return {
        ...state,
        baskets: {
          ...state.baskets,
          [action.payload.basketId]: {
            ...basket,
            offers_list: updatedOffers,
          },
        },
      };
    }
    case MultiBasketTypes.REMOVE_OFFER_FROM_BASKET: {
      const basket = state.baskets[action.payload.basketId];
      if (!basket) return state; // or handle error
      return {
        ...state,
        baskets: {
          ...state.baskets,
          [action.payload.basketId]: {
            ...basket,
            offers_list: basket.offers_list.filter(
              (offer) => offer.id !== action.payload.offerId
            ),
          },
        },
      };
    }
    default:
      return state;
  }
};
