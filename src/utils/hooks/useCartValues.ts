import React, { useContext } from "react";
import { useCart } from "../../provider/Cart/CartProvider";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { getPaymentMethodFromEnum } from "../helpers/cart";
import {
  PaymentMethodEnum,
  paymentPlanMapping,
} from "../../interfaces/BankData";
interface Props {
  selectedMethod: PaymentMethodEnum | null;
  selectedCondition: number | null;
}
export const useCartValues = ({ selectedMethod, selectedCondition }: Props) => {
  const { state } = useCart();
  const { selectedCompany } = useContext(AuthContext);

  const serviceFeeTotal =
    state.total * (Number(selectedCompany?.service_fee || 0) / 100 || 0);

  const selectedMethodObject = getPaymentMethodFromEnum(selectedMethod);

  const paymentTax =
    (Number(
      paymentPlanMapping.find(
        (plan) =>
          plan.payment_method.id === selectedMethodObject?.id &&
          plan.payment_condition.id === Number(selectedCondition)
      )?.fee || 0
    ) /
      100) *
    state.total;

  const finalValue = state.total + serviceFeeTotal + paymentTax;

  return {
    subtotalValue: state.total,
    serviceFeeTotal,
    finalValue,
    companyFee: selectedCompany?.service_fee || 0,
  };
};
