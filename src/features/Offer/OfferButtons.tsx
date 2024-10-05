import React, { useCallback, useMemo } from "react";
import { Button } from "../../components/Button";
import { Flex } from "../../components/Flex";
import { useModal } from "../../utils/hooks/useModal";
import { Offer } from "../../interfaces/Offer";
import ProductAmountInput from "../Cart/CartList/ProductAmountInput";
import { useCart } from "../../provider/Cart/CartProvider";
import { useMultiBaskets } from "../../provider/Basket/MultiBasketsProvider";

interface Props {
  isCart?: boolean;
  handleSelectedOffer?: (offer: Offer) => void;
  offer: Offer;
  isReplacing?: boolean;
  isBeingReplaced?: boolean;
  isExploring?: boolean;
  handleAdd?: (offer: Offer, value: number | undefined) => void;
  handleReplace?: () => void;
}

export const OfferButtons = ({
  handleSelectedOffer,
  handleAdd,
  handleReplace,
  offer,
  isCart,
  isReplacing,
  isBeingReplaced,
  isExploring,
}: Props): JSX.Element => {
  const { openModal } = useModal({ modalId: "replaceOffer" });

  const { state } = useCart();
  const {
    state: { baskets },
  } = useMultiBaskets();

  const getOfferQuantity = useCallback(
    (searchId: number) => {
      const offer = Object.values(baskets)
        .flatMap((entry) => entry.offers_list)
        .find((offer) => offer.id === searchId);

      return offer ? offer.quantity : null;
    },
    [baskets]
  );
  const quantity = useMemo(() => {
    return isCart
      ? getOfferQuantity(offer.id)
      : state.items.find((item) => item.id === offer.id)?.quantity;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCart, baskets, state, offer]);

  return (
    <Flex direction="col" className="gap-4">
      {!isReplacing && !isBeingReplaced && (
        <>
          {quantity && Number(quantity) > 0 ? (
            <ProductAmountInput
              offer={offer}
              value={Number(quantity)}
              callbackUpdateAmount={(offer, value) => handleAdd?.(offer, value)}
            />
          ) : (
            <Button
              variant="success"
              className="w-full flex items-center justify-center"
              onClick={() => handleAdd?.(offer, 1)}
              label="Comprar"
            />
          )}
        </>
      )}
      {!isExploring && (
        <Button
          variant="primary"
          className="w-full flex items-center justify-center"
          disabled={!offer.similar_offers?.length || isBeingReplaced}
          onClick={async () => {
            if (isReplacing) {
              handleReplace?.();
              return;
            }
            handleSelectedOffer?.(offer);
            openModal();
          }}
          label="Substituir"
        />
      )}
    </Flex>
  );
};
