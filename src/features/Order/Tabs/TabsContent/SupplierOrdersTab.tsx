import React from "react";
import { Order } from "../../../../interfaces/Order";
import { TabContent } from "../../../../components/Tab/TabContent";
import { GenericOrderTab } from "../GenericOrderTab";
interface Props {
  order: Order;
  value: string | number;
}
export const SupplierOrdersTab = ({ order, value }: Props): JSX.Element => {
  return (
    <>
      {order.supplier_orders?.map((supplierOrder) => (
        <TabContent
          key={supplierOrder.id}
          value={value}
          expectedValue={`${supplierOrder.id}`}
        >
          <GenericOrderTab
            tabValue={supplierOrder.id}
            orderData={
              supplierOrder.orderProducts.map((product) => ({
                product: product,
                supplier: supplierOrder.supplier,
                supplierOrderStatus: supplierOrder.status,
              })) || []
            }
            isStatusBased={true}
            status={supplierOrder.status}
          />
        </TabContent>
      ))}
    </>
  );
};
