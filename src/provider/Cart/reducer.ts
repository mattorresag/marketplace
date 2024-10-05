import { Action, ActionMap } from "../../interfaces/Action";
import { CartItem } from "../../interfaces/Cart";
import { CartState } from "./CartProvider";

export enum CartTypes {
  UPDATE_CART = "UPDATE_CART",
  ADD_ITEM = "ADD_ITEM",
  ADD_MULTIPLE_ITEMS = "ADD_MULTIPLE_ITEMS",
  GET_ITEMS = "GET_ITEMS",
  REMOVE_ITEM = "REMOVE_ITEM",
}

type CartPayload = {
  [CartTypes.UPDATE_CART]: CartItem[];
  [CartTypes.GET_ITEMS]: CartItem[];
  [CartTypes.REMOVE_ITEM]: CartItem;
  [CartTypes.ADD_ITEM]: CartItem;
  [CartTypes.ADD_MULTIPLE_ITEMS]: CartItem[];
};

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>];

export const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case CartTypes.ADD_ITEM:
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      return {
        ...state,
        total: state.items
          .map(
            (item) =>
              Number(item.custom_price_value || 0) * (item.quantity || 1)
          )
          .reduce((a, b) => a + b, 0),
      };
    case CartTypes.ADD_MULTIPLE_ITEMS:
      const newItems = [...state.items];

      action.payload.forEach((newItem) => {
        const itemIndex = newItems.findIndex((item) => item.id === newItem.id);

        if (itemIndex !== -1) {
          !newItems[itemIndex].quantity
            ? (newItems[itemIndex].quantity = 1)
            : (newItems[itemIndex].quantity! += newItem?.quantity || 1);
        } else {
          newItems.push(newItem);
        }
      });

      return {
        items: newItems,
        total: newItems
          .map(
            (item) =>
              Number(item.custom_price_value || 0) * (item.quantity || 1)
          )
          .reduce((a, b) => a + b, 0),
      };

    case CartTypes.UPDATE_CART:
      return {
        items: action.payload,
        total: action.payload
          .map(
            (item) =>
              Number(item.custom_price_value || 0) * (item.quantity || 1)
          )
          .reduce((a, b) => a + b, 0),
      };
    case CartTypes.REMOVE_ITEM: {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        items: newItems,
        total: newItems
          .map(
            (item) =>
              Number(item.custom_price_value || 0) * (item.quantity || 1)
          )
          .reduce((a, b) => a + b, 0),
      };
    }
    case CartTypes.GET_ITEMS: {
      if (Array.isArray(action.payload))
        return {
          items: action.payload,
          total: action.payload
            .map(
              (item) =>
                Number(item.custom_price_value || 0) * (item.quantity || 1)
            )
            .reduce((a, b) => a + b, 0),
        };
    }
    default:
      return state;
  }
};
