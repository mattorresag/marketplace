import React from "react";
import { TabContent } from "../../../../components/Tab/TabContent";
import { GenericOrderTab } from "../GenericOrderTab";
import { Order } from "../../../../interfaces/Order";
import { Flex } from "../../../../components/Flex";
interface Props {
  order: Order;
  value: string | number;
}
export const AllProductsTab = ({ order, value }: Props): JSX.Element => {
  return (
    <TabContent value={value} expectedValue={`allProducts`}>
      <GenericOrderTab
        tabValue={`allProducts`}
        topContent={
          order?.status === "IN_QUESTION" ? (
            <Flex className="bg-neutral-200 gap-4 p-2 rounded mb-3">
              Pedido em análise
            </Flex>
          ) : undefined
        }
        orderData={
          order.supplier_orders?.flatMap((supplierOrder) =>
            supplierOrder.orderProducts.map((product) => ({
              product: product,
              supplier: supplierOrder.supplier,
              supplierOrderStatus: supplierOrder.status,
            }))
          ) || []
        }
        showExtraTabs={order.status !== "IN_QUESTION"}
      />
    </TabContent>
  );
};
