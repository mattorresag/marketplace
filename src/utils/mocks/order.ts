import {
  PaymentCondition,
  PaymentMethod,
  PaymentPlan,
} from "../../interfaces/BankData";
import {
  IPropsSupplierOrders,
  Order,
  OrderProduct,
  OrderProductStatus,
  OrderStatus,
} from "../../interfaces/Order";

// Helper function to generate random dates
const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const mockedOrders = Array.from({ length: 5 }, (_, index): Order => {
  const paymentMethod: PaymentMethod = {
    id: index,
    description: `Payment Method ${index}`,
  };

  const paymentCondition: PaymentCondition = {
    id: index,
    description: `Payment Condition ${index}`,
  };

  const paymentPlan: PaymentPlan = {
    id: index,
    description: `Payment Plan ${index}`,
    fee: index * 0.01,
    payment_method: paymentMethod,
    payment_condition: paymentCondition,
  };

  const statusOptions: OrderStatus[] = [
    "IN_QUESTION",
    "REVIEWED",
    "AWAITING_ADJUSTS",
    "AWAITING_PAYMENT",
    "REQUESTING",
    "REQUESTED",
    "PARTIALLY_DELIVERED",
    "DELIVERED",
    "FINISHED",
    "CANCELED",
  ];

  const statusOrderOptions: OrderProductStatus[] = [
    "CANCELED",
    "PRE_SHORTAGE",
    "POS_SHORTAGE",
  ];

  const randomStatus =
    statusOptions[Math.floor(Math.random() * statusOptions.length)];

  const mockedOrderProducts = (supplierOrderId: number): OrderProduct[] => {
    return Array.from({ length: 3 }, (_, index): OrderProduct => {
      return {
        id: index,
        unit_negotiated_supplier: `Unit ${index}`,
        offer_id: index,
        ean_code: `EAN${index}`,
        productDescription: `Product ${index}`,
        quantity: index * 100,
        unitPlatformPrice: index * 10,
        unitNegotiatedPrice: index * 9,
        unitTypedPrice: index * 8,
        unitCostPrice: index * 7,
        costPriceId: index,
        deliveryDate: getRandomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
        supplierId: supplierOrderId,
        calculations: {
          originalTotalValue: 100 + index * 10,
          negotiatedTotalValue: 90 + index * 9,
        },
      };
    });
  };

  const mockedSupplierOrders = (orderId: number): IPropsSupplierOrders[] => {
    return Array.from({ length: 3 }, (_, index): IPropsSupplierOrders => {
      return {
        id: index,
        code: index,
        createdAt: getRandomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
        updatedAt: getRandomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
        orderId: orderId,
        supplierDocument: `${index}12345678`,
        supplierOrderNo: `SUP${index}`,
        receipt: `REC${index}`,
        observation: `Observation ${index}`,
        deliveryValueCents: index * 1000,
        deliveryDate: getRandomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
        paymentPlanId: index,
        status: "BUDGETED", // You can randomize this too if needed
        supplier: {
          id: index,
          trade_name: `Supplier ${index}`,
          // Add other required fields for the Supplier here...
        },
        orderProducts: mockedOrderProducts(index), // You might want to mock this too
        calculations: {
          estimatedDeliveryDate: `2023-05-${String(index).padStart(2, "0")}`,
          negotiatedTotalValue: 90 + index * 9,
          negotiatedDiscount: index * 0.5,
          originalTotalValue: 100 + index * 10,
          preShortageDiscount: index * 0.3,
          totalValue: 80 + index * 8,
        },
      };
    });
  };

  return {
    id: index,
    createdAt: getRandomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
    updatedAt: getRandomDate(new Date(2022, 0, 1), new Date(2023, 0, 1)),
    company_document: `${index}12345678`,
    payment_method: paymentMethod,
    payment_condition: paymentCondition,
    applied_coupon_code: index % 2 === 0 ? `COUPON${index}` : null,
    discount: index % 3 === 0 ? index : null,
    observation: index % 5 === 0 ? `Observation ${index}` : null,
    delivery_date: getRandomDate(new Date(2023, 0, 1), new Date(2024, 0, 1)),
    status: randomStatus,
    payment_plan: paymentPlan,
    supplier_orders: mockedSupplierOrders(index),
    calculations: {
      original_total_value: 100 + index * 10,
      negotiated_total_value: 90 + index * 9,
      negotiated_discount: index * 0.5,
      pre_shortage_discount: index * 0.3,
      coupon_discount: index % 2 === 0 ? index * 0.1 : undefined,
      total_value: 80 + index * 8,
      tax: index * 0.05,
      final_total_value: 70 + index * 7,
      service_fee: index * 0.02,
      estimated_delivery_date: `2023-05-${String(index).padStart(2, "0")}`,
    },
    invoice_id: `INV${index}`,
  };
});

export default mockedOrders;
