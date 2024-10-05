import { CartItem } from "../../interfaces/Cart";
import { CartActions, CartTypes } from "./reducer";

export const addItem = (payload: CartItem): CartActions => ({
  type: CartTypes.ADD_ITEM,
  payload,
});

export const addMultipleItems = (payload: CartItem[]): CartActions => ({
  type: CartTypes.ADD_MULTIPLE_ITEMS,
  payload,
});

export const getCartItems = (payload: CartItem[]): CartActions => ({
  type: CartTypes.GET_ITEMS,
  payload,
});

export const updateCartItems = (payload: CartItem[] | []): CartActions => ({
  type: CartTypes.UPDATE_CART,
  payload,
});

export const removeCartItem = (payload: CartItem): CartActions => ({
  type: CartTypes.REMOVE_ITEM,
  payload,
});
