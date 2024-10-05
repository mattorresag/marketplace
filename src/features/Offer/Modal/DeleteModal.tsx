import React from "react";
import { Modal } from "../../../components/Modal";
import { useModal } from "../../../utils/hooks/useModal";
import { Flex } from "../../../components/Flex";
import Image from "next/image";
import { formatCurrency } from "../../../utils/helpers/formatters";
import { CartItem } from "../../../interfaces/Cart";
import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";

interface Props {
  deleteCallback: () => void;
  selectedProduct: CartItem | null;
}
export const DeleteModal = ({
  deleteCallback,
  selectedProduct,
}: Props): JSX.Element => {
  const { closeModal } = useModal({ modalId: "deleteProduct" });
  return (
    <>
      {selectedProduct && (
        <Modal
          id="deleteProduct"
          title="Quer realmente remover este produto?"
          maxSize="md"
          buttons={{
            confirm: {
              content: "Manter",
              variant: "primary",
              callBack: closeModal,
            },
            cancel: {
              content: "Excluir",
              variant: "error",
              callBack: () => deleteCallback(),
              outline: true,
            },
          }}
        >
          <Flex align="center" className="w-full gap-4">
            <Image
              src={
                // selectedProduct?.commercial_product.base_product?.image ||
                SampleProductImage
              }
              alt={
                // selectedProduct?.commercial_product.base_product?.description ||
                "Imagem do produto"
              }
            />
            <Flex direction="col" justify="between" className="gap-4">
              <h5 className="font-bold text-lg">
                {selectedProduct?.commercial_product.base_product?.description}
              </h5>
              <h5 className="text-primary-500 font-bold">
                {formatCurrency(
                  Number(selectedProduct?.custom_price_value || 0)
                )}
              </h5>
            </Flex>
          </Flex>
        </Modal>
      )}
    </>
  );
};
