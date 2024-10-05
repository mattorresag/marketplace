import React from "react";
import { Modal } from "../../../components/Modal";
import { Flex } from "../../../components/Flex";
import OfferItem from "../../../components/Offer";
import Replace from "/public/assets/images/icons/replace.svg?svgr";
import { Offer } from "../../../interfaces/Offer";
import { SmallSlider } from "../../../components/Slider";
import { useDeviceType } from "../../../utils/hooks/useDeviceType";
import { useMultiBaskets } from "../../../provider/Basket/MultiBasketsProvider";
import { replaceOfferInMultiBasket } from "../../../provider/Basket/action";
interface Props {
  selectedOffer: Offer;
  basketId: number;
}
export const ReplaceModal = ({
  selectedOffer,
  basketId,
}: Props): JSX.Element => {
  const { isTablet } = useDeviceType();
  const { dispatch } = useMultiBaskets();
  const handleReplace = (oldOffer: Offer, newOffer: Offer) => {
    dispatch(replaceOfferInMultiBasket({ basketId, oldOffer, newOffer }));
  };

  return (
    <Modal title="Substituir por similar" id="replaceOffer" maxSize="6xl">
      {isTablet ? (
        <Flex align="center" className="gap-8">
          <OfferItem
            offer={selectedOffer}
            isBeingReplaced
            showUsualButtons={false}
          />
          <Replace className="text-primary-500 font-bold w-[2rem] lg:w-[5rem] h-[2rem] lg:h-[5rem]" />
          <SmallSlider options={{ dragFree: true }}>
            <Flex className="gap-4">
              {selectedOffer.similar_offers?.map((offer) => (
                <OfferItem
                  handleReplace={() => handleReplace(selectedOffer, offer)}
                  isReplacing
                  key={offer.id}
                  offer={offer}
                />
              ))}
            </Flex>
          </SmallSlider>
        </Flex>
      ) : (
        <SmallSlider options={{ dragFree: true }}>
          <Flex align="center" className="gap-8">
            <OfferItem
              offer={selectedOffer}
              isBeingReplaced
              showUsualButtons={false}
            />
            <Replace className="text-primary-500 font-bold w-[2rem] lg:w-[5rem] h-[2rem] lg:h-[5rem]" />
            {selectedOffer.similar_offers?.map((offer) => (
              <OfferItem isReplacing key={offer.id} offer={offer} />
            ))}
          </Flex>
        </SmallSlider>
      )}
    </Modal>
  );
};
