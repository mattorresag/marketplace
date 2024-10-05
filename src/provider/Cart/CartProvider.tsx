import React, { createContext, useReducer, useContext, useMemo } from "react";
import { CartItem } from "../../interfaces/Cart";
import { cartReducer } from "./reducer";
import { Action } from "../../interfaces/Action";
import { AuthContext } from "../Auth/AuthContext";

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useContext(AuthContext);

  // //Need to implement company
  // const { data } = useCartItems({
  //   companyId: 1,
  //   options: { enabled: !!user?.name, refetchOnWindowFocus: false },
  // });

  // const { mutateAsync } = useMutateCart({ userId: user?.id || 0 });

  // useEffect(() => {
  //   if (data?.resources) dispatch(getCartItems(data.resources));
  // }, [data, dispatch]);

  // useEffect(() => {
  //   // This effect will run every time the cart state changes.
  //   // You can make your API call here to update the database.
  //   mutateAsync({ items: state.items })
  //     .then(() => toast.success("Carrinho atualizado com sucesso!"))
  //     .catch(() => toast.error("Ocorreu um erro ao atualizar o carrinho."));
  // }, [mutateAsync, state]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = (): {
  state: CartState;
  dispatch: React.Dispatch<Action>;
} => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
