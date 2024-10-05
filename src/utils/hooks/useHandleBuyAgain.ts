import React from "react";
import { useCart } from "../../provider/Cart/CartProvider";
import { Order } from "../../interfaces/Order";
import { addMultipleItems } from "../../provider/Cart/actions";
interface Props {
  order: Order;
}
export const useHandleBuyAgain = () => {
  const { dispatch } = useCart();

  const handleBuyAgain = (order: Order) => {
    dispatch(
      addMultipleItems(
        order.supplier_orders.map((supplier_order) =>
          supplier_order.offers_list.map((offer) => offer)
        )
      )
    );
  };

  return {
    handleBuyAgain,
  };
};
