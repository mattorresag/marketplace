import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";

import { Flex } from "../Flex";
import { Offer } from "../../interfaces/Offer";
import ArrowDown from "/public/assets/images/icons/arrowDown.svg?svgr";
import { ImageWithFallback } from "../ImageWithFallback";
import { OfferButtons } from "../../features/Offer/OfferButtons";
import { useRouter } from "next/router";

interface Props {
  offer: Offer;
  handleSelectedOffer?: (offer: Offer) => void;
  handleSelectedProduct?: () => void;
  showUsualButtons?: boolean;
  isReplacing?: boolean;
  isBeingReplaced?: boolean;
  isCart?: boolean;
  isExploring?: boolean;
  handleAdd?: (offer: Offer, value: number | undefined) => void;
  handleReplace?: () => void;
}

const Offer = ({
  offer,
  handleAdd,
  handleSelectedOffer,
  handleSelectedProduct,
  handleReplace,
  isReplacing = false,
  isBeingReplaced = false,
  isCart = false,
  isExploring = false,
}: Props) => {
  const { discount_percentage } = offer;
  const router = useRouter();

  return (
    <Flex
      direction="col"
      justify="between"
      className="min-w-[226px] w-full lg:w-[226px] p-4 bg-white rounded-md gap-4"
      onClick={handleSelectedProduct}
    >
      <Flex
        direction="col"
        className=" gap-4 w-full cursor-pointer"
        onClick={() => router.push(`/ofertas/oferta/${offer.id}`)}
      >
        <Flex justify="end" className="w-full">
          {!isCart && discount_percentage && (
            <Flex className="gap-1 text-green-500 font-bold">
              <ArrowDown />
              <span className="text-sm">{discount_percentage}%</span>
            </Flex>
          )}
        </Flex>
        <Flex justify="center">
          <ImageWithFallback
            src={
              // offer.commercial_product.base_product?.image ||
              SampleProductImage
            }
            alt={
              offer.commercial_product.base_product?.description || "Produto"
            }
            fallbackSrc={SampleProductImage}
          />
        </Flex>
        <Flex>
          <p className="text-md font-bold text-black">
            {offer.commercial_product.base_product?.description || "Produto"}
          </p>
        </Flex>
        <Flex>
          <p className="text-xl text-primary-500">
            <strong>R${offer.custom_price_value}</strong>
          </p>
        </Flex>
      </Flex>
      <OfferButtons
        isCart={isCart}
        handleAdd={handleAdd}
        offer={offer}
        isBeingReplaced={isBeingReplaced}
        isReplacing={isReplacing}
        isExploring={isExploring}
        handleReplace={handleReplace}
        handleSelectedOffer={handleSelectedOffer}
      />
    </Flex>
  );
};

export default Offer;
