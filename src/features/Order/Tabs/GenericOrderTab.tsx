import React from "react";
import { DesktopOrderItem } from "../Item/DesktopOrderItem";
import { OrderItemHeader } from "../Item/OrderItemHeader";
import { useDeviceType } from "../../../utils/hooks/useDeviceType";
import { Flex } from "../../../components/Flex";
import { OrderProduct, SupplierOrderStatus } from "../../../interfaces/Order";
import { Seller } from "../../../interfaces/Seller";
import { MobileOrderItem } from "../Item/MobileOrderItem";

interface GenericOrderData {
  product: OrderProduct;
  supplier?: Seller;
  supplierOrderStatus?: SupplierOrderStatus;
}

interface GenericOrderTabProps {
  tabValue: string | number;
  topContent?: JSX.Element;
  orderData: GenericOrderData[];
  isStatusBased?: boolean;
  status?: string;
  showExtraTabs?: boolean;
}

export const GenericOrderTab = ({
  tabValue,
  topContent,
  orderData,
  isStatusBased = false,
  status,
  showExtraTabs,
}: GenericOrderTabProps): JSX.Element => {
  const { isTablet } = useDeviceType();

  return (
    <div className="bg-white rounded-md" data-value={tabValue}>
      {topContent}

      <Flex direction="col">
        {isTablet && <OrderItemHeader showExtraTabs={showExtraTabs} />}
        <Flex
          direction="col"
          className="w-full [&>*:nth-child(odd)]:bg-neutral-50 p-4 pt-8 lg:p-8 lg:pt-0"
        >
          {orderData.map(({ product, supplier, supplierOrderStatus }) => {
            if (isStatusBased && (status === "CANCELED" || product.status)) {
              return null;
            }
            return isTablet ? (
              <DesktopOrderItem
                key={product.id}
                showExtraTabs={showExtraTabs}
                supplierOrderStatus={supplierOrderStatus}
                supplier={supplier}
                orderProduct={product}
              />
            ) : (
              <MobileOrderItem
                key={product.id}
                showExtraTabs={showExtraTabs}
                supplierOrderStatus={supplierOrderStatus}
                supplier={supplier}
                orderProduct={product}
              />
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
};
