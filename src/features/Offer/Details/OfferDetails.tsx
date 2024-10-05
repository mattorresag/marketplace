import { FC, useContext, useMemo, useState } from "react";

import { toast } from "react-toastify";
import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";
import { Offer } from "../../../interfaces/Offer";
import { useDeviceType } from "../../../utils/hooks/useDeviceType";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { useCart } from "../../../provider/Cart/CartProvider";
import { Flex } from "../../../components/Flex";
import { ImageWithFallback } from "../../../components/ImageWithFallback";
import Icons from "../../../../public/assets/images/icons";
import { getDeliveryDate } from "../../../utils/helpers/date";
import { OfferButtons } from "../OfferButtons";
import { useHandleCart } from "../../../utils/hooks/useHandleCart";
import { formatCurrency } from "../../../utils/helpers/formatters";
import { removeCartItem } from "../../../provider/Cart/actions";

interface Props {
  offer: Offer;
}

const OfferDetailsCard = ({ offer }: Props) => {
  const { isDesktop, isTablet } = useDeviceType();
  const { selectedCompany } = useContext(AuthContext);

  const { state: cartItems, dispatch } = useCart();

  const { base_product: product } = offer?.commercial_product;

  const cartItem = useMemo(() => {
    return cartItems.items.find((cartProduct) => cartProduct.id === offer.id);
  }, [cartItems, offer]);

  const { handleAddProductToCart } = useHandleCart();

  const handleAdd = (offer: Offer, value: number | undefined) => {
    if (value === 0) {
      return dispatch(removeCartItem(offer));
    }
    handleAddProductToCart(offer, value);
  };

  return (
    <Flex className="gap-2 mt-5 w-full" direction={isTablet ? "row" : "col"}>
      <Flex
        direction={isDesktop ? "row" : "col"}
        className="bg-white rounded-lg shadow-sm p-8 w-[100%] md:w-[50%] lg:w-[65%]"
      >
        <Flex
          className="relative p-8 w-full lg:w-[50%]"
          justify="center"
          align="center"
        >
          <ImageWithFallback
            fallbackSrc={SampleProductImage}
            // src={product?.image ?? SampleProductImage}
            src={SampleProductImage}
            alt={product?.description || "Imagem do produto"}
            objectFit="contain"
            layout={isDesktop ? "fill" : "fixed"}
          />
        </Flex>
        <Flex direction="col" className="gap-2 p-8 w-full lg:w-[50%]">
          <h5 className="text-neutral-400 text-base font-normal leading-5">
            {product?.identifier_code}
          </h5>
          <h1 className="text-[28px] leading-8 font-bold text-neutral-700 mt-1 mb-8">
            {product?.description}
          </h1>
          <div className="divider" />

          <div className="mt-4 mb-5 text-sm">
            {product?.brand && (
              <h5 className="text-sm text-neutral-400">
                Marca: {product?.brand}
              </h5>
            )}
            {/* {offer.unitType && (
                            <h5>
                                Vendido em {offer.unitType}{' '}
                                {offer.conversion !== 1 &&
                                    `com ${offer.conversion} ${offer.product.unitType}`}
                            </h5>
                        )} */}
          </div>

          {product?.description && (
            <h4 className="mb-1 text-neutral-400 text-sm font-bold">
              Descrição
            </h4>
          )}
          <p className="text-neutral-400 text-sm">{product?.description}</p>
          {/* <div
                        className={`product-alternative ${
                            offer.custom_price_value  &&
                            customPrice.showReferenceValue &&
                            offer.showSimilarProductMessage
                                ? 'visible'
                                : 'hidden md:invisible'
                        } text-secondary-500`}
                    >
                        <SearchIcon fontSize="inherit" />
                        Oferta alternativa baseada no produto <br />
                    </div> */}
          {/* <div className="product-alternative-name">
                        {customPrice &&
                        customPrice.showReferenceValue &&
                        offer.showSimilarProductMessage
                            ? customPrice?.referenceProduct?.name
                            : null}
                    </div> */}
          <div className="divider m-0 md:hidden mt-2" />
        </Flex>
      </Flex>

      <Flex
        direction="col"
        className="gap-2 bg-white rounded-lg shadow-sm py-4 px-4 pt-14 pb-6 px-9 w-[100%] md:w-[50%] lg:w-[35%] flex-col"
      >
        {offer.discount_percentage && Number(offer.discount_percentage) > 0 && (
          <>
            <h5 className="text-neutral-400 text-sm">
              {Number(offer.discount_percentage).toFixed() === "0"
                ? "Mesmo preço da sua última compra"
                : `Último preço pago neste produto`}
            </h5>
            <Flex className="mt-2 gap-2" align="center">
              <s className="font-source-sans-pro text-neutral-400 text-xl font-normal">
                {formatCurrency(
                  Number(offer.commercial_product.unit_value || 0)
                )}
              </s>
              <Flex className="bg-success-500 text-graylight-50 font-bold text-sm gap-1 p-1 rounded">
                <Icons.ArrowDown fontSize="inherit" />
                {Number(offer.discount_percentage) * -1}%
              </Flex>
            </Flex>
          </>
        )}
        <div className="font-semibold text-[40px] text-neutral-800 leading-tight">
          {formatCurrency(Number(offer.custom_price_value || 0))}
        </div>
        <div className="divider m-0" />
        <Flex direction="col" className="gap-4">
          <Flex align="center" className="gap-2 text-neutral-500 text-sm">
            <Icons.MapPin />
            <span>Será entregue na padaria {selectedCompany?.trade_name}.</span>
          </Flex>
          <h5 className="text-neutral-800">
            Pedindo hoje, receba até <strong>{getDeliveryDate()}</strong>.
          </h5>
        </Flex>

        <div className="divider m-0" />
        <div className="mt-9 mb-3">
          <OfferButtons handleAdd={handleAdd} offer={offer} isExploring />
        </div>

        <div className="offer-details-subTotal">
          <h4 className="text-sm text-primary-500">Subtotal da compra</h4>
          <h4 className="text-2xl text-primary-500 font-semibold">
            {formatCurrency(
              Number(offer.custom_price_value || 0) *
                (Number(cartItem?.quantity) || 0)
            )}
          </h4>
        </div>
      </Flex>
    </Flex>
  );
};

export default OfferDetailsCard;
