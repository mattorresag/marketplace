import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { CartItem } from "../../interfaces/Cart";

import { AuthContext } from "../Auth/AuthContext";
import { Basket } from "../../interfaces/Offer";
import { Action } from "../../interfaces/Action";
import { multiBasketsReducer } from "./reducer";
import { useBaskets } from "../../http/hooks/basket/useBaskets";
import { getMultiBasketsItems } from "./action";

export interface MultiBasketState {
  baskets: Record<string, Basket>;
}

const initialState: MultiBasketState = {
  baskets: {},
};

const BasketContext = createContext<
  | {
      state: MultiBasketState;
      dispatch: React.Dispatch<Action>;
      isLoading: boolean;
    }
  | undefined
>(undefined);

export const MultiBasketsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(multiBasketsReducer, initialState);
  const { selectedCompany } = useContext(AuthContext);

  const { isLoading } = useBaskets({
    companyId: selectedCompany?.id || 0,
    options: {
      enabled: !!selectedCompany,
      refetchOnWindowFocus: false,
      onSuccess: (baskets) => {
        const basketsObject = baskets?.reduce<Record<string, Basket>>(
          (acc, basket) => {
            acc[basket.id] = basket;
            return acc;
          },
          {}
        );
        dispatch(getMultiBasketsItems(basketsObject));
      },
    },
  });

  const contextValue = useMemo(
    () => ({ state, dispatch, isLoading }),
    [state, dispatch, isLoading]
  );

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export const useMultiBaskets = (): {
  state: MultiBasketState;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
} => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a CartProvider");
  }
  return context;
};
