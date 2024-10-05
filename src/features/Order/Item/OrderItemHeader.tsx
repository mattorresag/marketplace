import React from "react";
import { Flex } from "../../../components/Flex";

interface Props {
  showExtraTabs?: boolean;
}

export const OrderItemHeader = ({
  showExtraTabs = false,
}: Props): JSX.Element => {
  return (
    <Flex
      align="center"
      className="w-[100%]
    h-[47px] py-8 px-8"
    >
      {/* <Flex
                justify="center"
                className={
                    showExtraTabs
                        ? 'details-header-item-all-products'
                        : 'details-header-item'
                }
            >
                <p className="text-neutral-700
        text-sm
        text-center">
                    <strong>Imagem</strong>
                </p>
            </Flex> */}
      <Flex justify="center" className="w-[37.5%]">
        <p
          className="text-neutral-700
        text-sm
        text-center"
        >
          <strong>Descrição</strong>
        </p>
      </Flex>
      {showExtraTabs && (
        <>
          <Flex
            justify="center"
            className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
          >
            <p
              className="text-neutral-700
        text-sm
        text-center"
            >
              <strong>Status de Entrega</strong>
            </p>
          </Flex>
          <Flex
            justify="center"
            className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
          >
            <p
              className="text-neutral-700
        text-sm
        text-center"
            >
              <strong>Fornecedor</strong>
            </p>
          </Flex>
        </>
      )}
      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p
          className="text-neutral-700
        text-sm
        text-center"
        >
          <strong>Quantidade</strong>
        </p>
      </Flex>
      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p
          className="text-neutral-700
        text-sm
        text-center"
        >
          <strong>Preço Unitário</strong>
        </p>
      </Flex>
      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p
          className="text-neutral-700
        text-sm
        text-center"
        >
          <strong>Total</strong>
        </p>
      </Flex>
    </Flex>
  );
};
