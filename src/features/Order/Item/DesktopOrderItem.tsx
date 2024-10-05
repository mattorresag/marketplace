import React, { useMemo } from "react";
import {
  OrderProduct,
  SupplierOrderStatus,
  supplierStatusMap,
} from "../../../interfaces/Order";
import { Seller } from "../../../interfaces/Seller";
import { Flex } from "../../../components/Flex";

interface Props {
  supplierOrderStatus?: SupplierOrderStatus;
  supplier?: Seller;
  orderProduct: OrderProduct;
  showExtraTabs?: boolean;
}

export const DesktopOrderItem = ({
  orderProduct,
  showExtraTabs = false,
  supplier,
  supplierOrderStatus,
}: Props): JSX.Element => {
  const status = useMemo(() => {
    if (orderProduct?.status === "CANCELED") return "Cancelado";
    if (["PRE_SHORTAGE", "POS_SHORTAGE"].includes(orderProduct?.status || ""))
      return "Ruptura";
    return supplierOrderStatus ? supplierStatusMap[supplierOrderStatus] : "";
  }, [orderProduct, supplierOrderStatus]);

  return (
    <Flex
      key={orderProduct?.id}
      align="center"
      className="w-[100%]
    min-h-[47px] py-4"
    >
      <Flex direction="col" className="w-[37.5%]" align="center">
        <p className="text-sm">{orderProduct?.ean_code}</p>
        <p className="text-base">
          <strong>{orderProduct?.productDescription}</strong>
        </p>
      </Flex>

      {showExtraTabs && (
        <>
          <Flex
            className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
            justify="center"
          >
            <p
              className={`${
                status === "Cancelado" ? "text-red-500" : "text-neutral-400"
              }`}
            >
              {status}
            </p>
          </Flex>
          <Flex
            className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
            justify="center"
          >
            <p className="details-order-info">
              {supplier?.trade_name ?? "Buscando fornecedor"}
            </p>
          </Flex>
        </>
      )}

      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p>{orderProduct?.quantity / 1000}</p>
      </Flex>
      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p>{orderProduct?.unitPlatformPrice}</p>
      </Flex>

      <Flex
        justify="center"
        className={showExtraTabs ? "w-[calc(100%/8)]" : "w-[37.5%]"}
      >
        <p>{orderProduct?.calculations?.originalTotalValue}</p>
      </Flex>
    </Flex>
  );
};
