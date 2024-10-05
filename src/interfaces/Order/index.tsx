import { PaymentCondition, PaymentMethod, PaymentPlan } from "../BankData";
import { Seller } from "../Seller";
import { Company } from "../User";

export type OrderStatus =
  | "IN_QUESTION"
  | "REVIEWED"
  | "AWAITING_ADJUSTS"
  | "AWAITING_PAYMENT"
  | "REQUESTING"
  | "REQUESTED"
  | "PARTIALLY_DELIVERED"
  | "DELIVERED"
  | "FINISHED"
  | "CANCELED";
export const OrderStatusArray = [
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

export type SanitizedOrderStatus =
  | "Em análise"
  | "Analisado"
  | "Aguardando ajustes"
  | "Aguardando pagamento"
  | "Solicitando com o fornecedor"
  | "Solicitado"
  | "Envio iniciado"
  | "Envio concluído"
  | "Finalizado"
  | "Cancelado";

export const statusMap: { [key in OrderStatus]: SanitizedOrderStatus } = {
  IN_QUESTION: "Em análise",
  REVIEWED: "Em análise",
  AWAITING_ADJUSTS: "Aguardando ajustes",
  AWAITING_PAYMENT: "Aguardando pagamento",
  REQUESTING: "Solicitando com o fornecedor",
  REQUESTED: "Solicitado",
  PARTIALLY_DELIVERED: "Envio iniciado",
  DELIVERED: "Envio concluído",
  FINISHED: "Finalizado",
  CANCELED: "Cancelado",
};

export const statusColorMap: { [key in OrderStatus]: string } = {
  IN_QUESTION: "#9EA3A5",
  REVIEWED: "#9EA3A5",
  AWAITING_ADJUSTS: "#9EA3A5",
  AWAITING_PAYMENT: "#9EA3A5",
  REQUESTING: "#9EA3A5",
  REQUESTED: "#AFCCE3",
  PARTIALLY_DELIVERED: "#F4E18C",
  DELIVERED: "#AFD49E",
  FINISHED: "#AFD49E",
  CANCELED: "#F8BCAE",
};

export type SupplierOrderStatus =
  | "IN_QUESTION"
  | "BUDGETED"
  | "REQUESTED"
  | "INVOICE_GENERATED"
  | "CHECKED"
  | "CANCELED";

export const supplierStatusColorMap: { [key in SupplierOrderStatus]: string } =
  {
    IN_QUESTION: "#E7E7EA",
    BUDGETED: "#E7E7EA",
    REQUESTED: "#AFCCE3",
    INVOICE_GENERATED: "#F2C068",
    CHECKED: "#afd49e",
    CANCELED: "#F8BCAE",
  };

export const supplierStatusMap: {
  [key in SupplierOrderStatus]: string;
} = {
  IN_QUESTION: "Processando",
  BUDGETED: "Processando",
  REQUESTED: "Solicitado",
  INVOICE_GENERATED: "Enviado",
  CHECKED: "Finalizado",
  CANCELED: "Cancelado",
};

export interface Order {
  id: number;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
  company_document: string;
  payment_method: PaymentMethod;
  payment_condition: PaymentCondition;
  applied_coupon_code: string | null;
  discount: number | null;
  observation: string | null;
  delivery_date: Date | null;
  status: OrderStatus;
  supplier_orders: IPropsSupplierOrders[];
  payment_plan: PaymentPlan;
  calculations: {
    original_total_value: number;
    negotiated_total_value: number;
    negotiated_discount: number;
    pre_shortage_discount: number;
    coupon_discount?: number;
    total_value: number;
    tax: number;
    final_total_value: number;
    service_fee: number;
    estimated_delivery_date: string;
  };
  invoice_id: string;
}

export type SupplierOrder = {
  id: number;
  code: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  supplierDocument: string;
  supplierOrderNo: string | null;
  receipt: string | null;
  observation: string | null;
  deliveryValueCents: number | null;
  deliveryDate: Date | null;
  paymentPlanId: number | null;
  status: SupplierOrderStatus;
};

export type OrderProductStatus =
  | "PRE_SHORTAGE"
  | "POS_SHORTAGE"
  | "CANCELED"
  | null;

export type OrderProduct = {
  id: number;
  unit_negotiated_supplier: string | null;
  offer_id: number | null;
  ean_code: string | null;
  productDescription: string;
  quantity: number;
  unitPlatformPrice: number;
  unitNegotiatedPrice: number | null;
  unitTypedPrice: number | null;
  unitCostPrice: number | null;
  costPriceId: number | null;
  deliveryDate: Date | null;
  status: OrderProductStatus;
  supplierId: number | null;
  calculations: {
    originalTotalValue: number;
    negotiatedTotalValue: number;
  };
};

export interface IPropsSupplierOrders extends SupplierOrder {
  supplier: Seller;
  orderProducts: OrderProduct[];
  calculations: {
    estimatedDeliveryDate: string;
    negotiatedTotalValue: number;
    negotiatedDiscount: number;
    originalTotalValue: number;
    preShortageDiscount: number;
    totalValue: number;
  };
}
