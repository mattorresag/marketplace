import { MultiBasketActions } from "../../provider/Basket/reducer";
import { CartActions } from "../../provider/Cart/reducer";

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Action = CartActions | MultiBasketActions;
