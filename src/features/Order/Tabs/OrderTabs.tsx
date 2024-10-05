import React, { useMemo, useState } from "react";
import { Flex } from "../../../components/Flex";
import {
  Order,
  OrderProduct,
  supplierStatusColorMap,
  supplierStatusMap,
} from "../../../interfaces/Order";
import { Tab } from "../../../components/Tab";
import { GenericOrderTab } from "./GenericOrderTab";
import { TabContent } from "../../../components/Tab/TabContent";
import { SmallSlider } from "../../../components/Slider";
import { ShortageTab } from "./TabsContent/ShortageTab";
import { AllProductsTab } from "./TabsContent/AllProductsTab";
import { SupplierOrdersTab } from "./TabsContent/SupplierOrdersTab";

interface Props {
  order: Order;
}

const shortage = (
  order?: Order
): {
  pre: OrderProduct[];
  pos: OrderProduct[];
} => {
  const pre: OrderProduct[] = [];
  const pos: OrderProduct[] = [];

  order?.supplier_orders.map(({ orderProducts }) =>
    orderProducts.map((orderProduct) => {
      if (orderProduct.status === "PRE_SHORTAGE") {
        return pre.push(orderProduct);
      }
      return orderProduct.status === "POS_SHORTAGE"
        ? pos.push(orderProduct)
        : null;
    })
  );

  return { pre, pos };
};

const calculateShortage = (orderProducts: OrderProduct[]): number => {
  const shortageValue = orderProducts.reduce((acc, orderProduct) => {
    if (orderProduct.status === "PRE_SHORTAGE") {
      return (
        acc +
        ((orderProduct.quantity / 1000) *
          (orderProduct?.unitNegotiatedPrice ??
            orderProduct.unitPlatformPrice)) /
          100
      );
    }
    return acc;
  }, 0);
  return shortageValue;
};

export const OrderTabs = ({ order }: Props): JSX.Element => {
  const [value, setValue] = useState("allProducts");

  const shortageProducts = useMemo(() => {
    const shortageReturn = shortage(order);
    return {
      pre: calculateShortage(shortageReturn.pre),
      pos: calculateShortage(shortageReturn.pos),
      products: [...shortageReturn.pos, ...shortageReturn.pre],
    };
  }, [order]);

  return (
    <Flex direction="col" className="p-3">
      <SmallSlider>
        <Flex className="tabs flex-nowrap">
          <Tab
            handleValue={() => setValue("allProducts")}
            value={value}
            expectedValue="allProducts"
          >
            <p className="text-primary-500">Todos os produtos</p>
          </Tab>
          {shortageProducts && shortageProducts?.products?.length > 0 && (
            <Tab
              background="#F8BCAE"
              handleValue={() => setValue("shortage")}
              value={value}
              expectedValue={"shortage"}
            >
              <p className="text-primary-500">Ruptura</p>
            </Tab>
          )}
          {order.supplier_orders?.map((supplierOrder) => {
            return (
              <Tab
                key={supplierOrder.id}
                value={value}
                expectedValue={`${supplierOrder.id}`}
                handleValue={() => setValue(`${supplierOrder.id}`)}
                background={supplierStatusColorMap[supplierOrder.status]}
              >
                <Flex direction="col">
                  <p className="text-primary-500">
                    {supplierOrder.supplier?.trade_name}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    {supplierStatusMap[supplierOrder.status]}
                  </p>
                </Flex>
              </Tab>
            );
          })}
        </Flex>
      </SmallSlider>
      <AllProductsTab order={order} value={value} />
      {shortageProducts && shortageProducts?.products.length > 0 && (
        <ShortageTab order={order} value={value} />
      )}
      <SupplierOrdersTab order={order} value={value} />
    </Flex>
  );
};
