import React, { useMemo } from "react";
import {
  OrderProduct,
  SupplierOrderStatus,
  supplierStatusMap,
} from "../../../interfaces/Order";
import { Seller } from "../../../interfaces/Seller";
import { Flex } from "../../../components/Flex";

// import SampleProductImage from '../../../assets/images/sample/sampleProductImage.png';

interface Props {
  supplierOrderStatus?: SupplierOrderStatus;
  orderProduct: OrderProduct;
  showExtraTabs?: boolean;
  supplier?: Seller;
}
export const MobileOrderItem = ({
  supplierOrderStatus,
  orderProduct,
  supplier,
  showExtraTabs = false,
}: Props): JSX.Element => {
  const status = useMemo(() => {
    if (orderProduct.status === "CANCELED") return "Cancelado";
    if (["PRE_SHORTAGE", "POS_SHORTAGE"].includes(orderProduct.status || ""))
      return "Ruptura";
    return supplierOrderStatus ? supplierStatusMap[supplierOrderStatus] : "";
  }, [orderProduct, supplierOrderStatus]);

  return (
    <Flex className="w-[100%] h-[200px] mb-6 px-1 py-4 gap-2" direction="col">
      <Flex className="gap-2 w-[100%] h-[66%]">
        <Flex
          className={
            showExtraTabs ? `w-[calc(200%/3)] gap-4` : `w-[100%] gap-4`
          }
        >
          {/* <Flex
                        direction="col"
                        justify="center"
                        className="w-fit relative"
                    >
                        <Image
                            src={SampleProductImage}
                            style={{
                                borderRadius: '8px',
                            }}
                            layout="fixed"
                            alt={orderProduct.productDescription}
                            width="60px"
                            height="60px"
                        />
                    </Flex> */}
          <Flex direction="col" justify="center" className="w-[100%] px-4">
            <p className="text-sm">{orderProduct.ean_code}</p>
            <p className="text-neutral-700 text-sm">
              <strong>{orderProduct.productDescription}</strong>
            </p>
          </Flex>
        </Flex>
        {showExtraTabs && (
          <Flex className="w-[calc(100%/3)]">
            <div className="divider divider-horizontal m-0" />
            <Flex
              direction="col"
              justify="between"
              className="w-[100%] h-[100%]"
            >
              <Flex direction="col" className="w-[100%] h-[50%]">
                <p className="text-neutral-700 text-sm text-center">
                  <strong>Status</strong>
                </p>
                <p
                  className={
                    status === "Cancelado"
                      ? "text-sm text-center text-red-500"
                      : "text-sm text-center"
                  }
                >
                  {status}
                </p>
              </Flex>
              <Flex direction="col" className="w-[100%] h-[50%]">
                <p className="text-neutral-700 text-sm text-center">
                  <strong>Fornecedor</strong>
                </p>
                <p className="text-sm text-center">
                  {supplier?.trade_name ?? "Buscando fornecedor"}
                </p>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex className="w-[100%] h-[33%] gap-1">
        <Flex direction="col" className="w-[calc(100%/3)]">
          <p className="text-neutral-700 text-sm text-center">
            <strong>Preço unitário</strong>
          </p>
          <p className="text-sm text-center">
            {(orderProduct?.unitNegotiatedPrice ??
              orderProduct.unitPlatformPrice) / 100}
          </p>
        </Flex>
        <div className="divider divider-horizontal m-0" />
        <Flex direction="col" align="center" className="w-[calc(100%/3)]">
          <p className="text-neutral-700 text-sm text-center">
            <strong>Quantidade</strong>
          </p>
          <p className="text-sm text-center">{orderProduct.quantity / 1000}</p>
        </Flex>
        <div className="divider divider-horizontal m-0" />
        <Flex direction="col" className="w-[calc(100%/3)]">
          <p className="text-neutral-700 text-sm text-center">
            <strong>Total</strong>
          </p>
          <p className="text-sm text-center">
            {orderProduct.calculations.negotiatedTotalValue}
          </p>
        </Flex>
      </Flex>
    </Flex>
  );
};
