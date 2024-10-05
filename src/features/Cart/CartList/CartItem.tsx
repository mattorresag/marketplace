import Image from "next/image";
import { ChangeEvent, FC, useContext, useState } from "react";

import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";
import { CartItem } from "../../../interfaces/Cart";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { useCart } from "../../../provider/Cart/CartProvider";
import ProductAmountInput from "./ProductAmountInput";
import { Flex } from "../../../components/Flex";
import { useHandleCart } from "../../../utils/hooks/useHandleCart";
import { useModal } from "../../../utils/hooks/useModal";
import { Offer } from "../../../interfaces/Offer";
import Icons from "../../../../public/assets/images/icons";
import { formatCurrency } from "../../../utils/helpers/formatters";

const CartItem: FC<{
  cartItemProduct: CartItem;
  addSelectedProductsCallback: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  setSelectedProduct: (offer: Offer) => void;
}> = ({
  cartItemProduct,
  addSelectedProductsCallback,
  checked,
  setSelectedProduct,
}) => {
  const parsedAmount = Number(cartItemProduct.quantity) || 0;

  const { handleAddProductToCart } = useHandleCart();

  const { openModal } = useModal({ modalId: "deleteProduct" });

  const handleRemoveProductFromCart = () => {
    openModal();
  };

  return (
    <>
      <Flex
        align="center"
        onClick={() => setSelectedProduct(cartItemProduct)}
        className="bg-white p-2 rounded-lg sm:py-4 sm:px-8 w-full"
      >
        <Flex align="center" className="w-full gap-4">
          <Flex className="gap-3 sm:w-[15%] w-[40%]" align="center">
            <input
              type="checkbox"
              className="checkbox"
              checked={checked}
              value={cartItemProduct.id}
              onChange={addSelectedProductsCallback}
            />
            <Image
              src={
                // cartItemProduct.commercial_product.base_product?.image ||
                SampleProductImage
              }
              alt={
                cartItemProduct.commercial_product?.base_product?.description ||
                "Imagem do produto"
              }
              width="80%"
              height="80%"
            />
          </Flex>
          <Flex
            className="gap-4 p-2 w-full md:py-4 sm:w-[85%] flex-col sm:flex-row sm:items-center"
            justify="between"
          >
            <Flex className="sm:w-[25%]">
              <h5 className="font-source-sans-pro font-semibold text-neutral-900 text-base">
                {cartItemProduct.commercial_product.base_product?.description}
              </h5>
            </Flex>
            {/* <FoundCheaperCard
                            setOpenModalCheaper={setOpenModalCheaper}
                            cartItemProduct={cartItemProduct}
                            cssClassName="cartItem-cheaper cartItem-cheaper-desktop"
                            hidden
                        /> */}
            <Flex direction="col">
              <h4 className="hidden md:block text-neutral-400 text-xs font-bold md:pb-2">
                Preço
              </h4>
              <h3 className="font-source-sans-pro text-neutral-900 text-sm md:mr-3">
                {formatCurrency(
                  Number(cartItemProduct.custom_price_value || 0)
                )}
              </h3>
            </Flex>
            <Flex className="sm:w-[60%]">
              <ProductAmountInput
                value={parsedAmount}
                callbackUpdateAmount={handleAddProductToCart}
                offer={cartItemProduct as Offer}
              />
            </Flex>
            <Flex direction="col">
              <h4 className=" text-xs text-neutral-500">SubTotal</h4>
              <h4 className="text-sm font-bold">
                {formatCurrency(
                  Number(cartItemProduct.custom_price_value || 0) * parsedAmount
                )}
              </h4>
            </Flex>
            <button
              className="bg-error-100 rounded-md p-2"
              onClick={handleRemoveProductFromCart}
            >
              <Icons.Trash />
            </button>
          </Flex>
        </Flex>
        {/* <div className="cartItem-modals-wrapper flex md:hidden">
                    <FoundCheaperCard
                        setOpenModalCheaper={setOpenModalCheaper}
                        cartItemProduct={cartItemProduct}
                        cssClassName="cartItem-cheaper md:hidden"
                        hidden
                    />
                    <div className="cartItem-delete block md:hidden">
                        <button onClick={handleRemoveProductFromCart}>
                            <DeleteOutline />
                        </button>
                    </div>
                </div> */}
      </Flex>
      {/* {openModalCheaper && (
                <FoundCheaperModal
                    open={openModalCheaper}
                    closeCallback={() => setOpenModalCheaper(!openModalCheaper)}
                    offer={cartItemProduct}
                />
            )} */}
    </>
  );
};

export default CartItem;
