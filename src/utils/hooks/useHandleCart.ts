import React from "react";
import { useCart } from "../../provider/Cart/CartProvider";
import {
  addItem,
  removeCartItem,
  updateCartItems,
} from "../../provider/Cart/actions";
import { Offer } from "../../interfaces/Offer";
import { useModal } from "./useModal";
import { toast } from "react-toastify";

export const useHandleCart = () => {
  const { dispatch } = useCart();

  const { openModal } = useModal({ modalId: "deleteProduct" });

  const handleAddProductToCart = (offer: Offer, value?: number) => {
    if (value === 0) {
      openModal();
      return;
    }
    dispatch(
      addItem({
        ...offer,
        quantity: value || 1,
      })
    );
    toast.success("Produto adicionado ao carrinho");
  };
  return {
    handleAddProductToCart,
  };
};
