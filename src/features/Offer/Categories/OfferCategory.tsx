import React, { useMemo, useState } from "react";
import { SmallSlider } from "../../../components/Slider";
import { Offer } from "../../../interfaces/Offer";
import OfferItem from "../../../components/Offer";
import { Flex } from "../../../components/Flex";
import { calculateTotalPercentageSaved } from "../../../utils/helpers/offer";
import { CartItem } from "../../../interfaces/Cart";
import { Button } from "../../../components/Button";
import { useMultiBaskets } from "../../../provider/Basket/MultiBasketsProvider";
import {
  addOfferToMultiBasket,
  replaceOfferInMultiBasket,
} from "../../../provider/Basket/action";
import { useCart } from "../../../provider/Cart/CartProvider";
import { addMultipleItems } from "../../../provider/Cart/actions";
import { useModal } from "../../../utils/hooks/useModal";
interface Props {
  category: string;
  basketId: number;
  offers: Offer[];
  handleSelectedOffer?: (offer: Offer) => void;
  handleSelectedProduct?: (cartItem: CartItem) => void;
}
export const OfferBasketCategory = ({
  basketId,
  category,
  offers,
  handleSelectedOffer,
  handleSelectedProduct,
}: Props): JSX.Element => {
  const percentageSaved = useMemo(() => {
    return calculateTotalPercentageSaved(offers);
  }, [offers]);

  const { state, dispatch } = useMultiBaskets();

  const { dispatch: dispatchCart } = useCart();

  const { openModal } = useModal({ modalId: "deleteProduct" });

  const handleAddMany = () => {
    const offers = state.baskets[basketId].offers_list;
    dispatchCart(addMultipleItems(offers));
  };

  const handleAdd = (offer: Offer, value: number | undefined) => {
    if (value === 0) {
      return openModal();
    }
    dispatch(
      addOfferToMultiBasket({
        basketId,
        offer: {
          ...offer,
          quantity: value,
        },
      })
    );
  };

  return (
    <Flex
      direction="col"
      className="gap-8 items-center lg:items-start"
      justify="center"
    >
      <Flex
        className="w-full flex-col gap-4 lg:flex-row"
        justify="between"
        align="center"
      >
        <h2 className="text-3xl font-bold text-primary-500">
          {category} - economia de{" "}
          <p className="text-secondary-500 inline">
            {percentageSaved.toFixed(2)}%
          </p>
        </h2>
        <Button
          variant="success"
          className="w-full lg:w-fit text-white"
          onClick={handleAddMany}
        >
          Adicionar ao carrinho
        </Button>
      </Flex>
      <SmallSlider options={{ dragFree: true }}>
        <Flex className="gap-4">
          {offers
            .sort(
              (a, b) =>
                Number(b.discount_percentage || 0) -
                Number(a.discount_percentage || 0)
            )
            .map((offer) => (
              <OfferItem
                isCart
                handleAdd={handleAdd}
                key={offer.id}
                offer={offer}
                handleSelectedOffer={handleSelectedOffer}
                handleSelectedProduct={() =>
                  handleSelectedProduct?.(offer as CartItem)
                }
              />
            ))}
        </Flex>
      </SmallSlider>
    </Flex>
  );
};
