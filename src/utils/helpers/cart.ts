import {
  PaymentCondition,
  PaymentConditionEnum,
  PaymentMethod,
  PaymentMethodEnum,
  paymentPlanMapping,
} from "../../interfaces/BankData";

export function getPaymentMethodFromEnum(
  paymentEnum: PaymentMethodEnum | null
): PaymentMethod | undefined {
  return paymentPlanMapping.find(
    (plan) => plan.payment_method.description === paymentEnum
  )?.payment_method;
}

export function getPaymentConditionFromEnum(
  conditionEnum: PaymentConditionEnum | null
): PaymentCondition | undefined {
  return paymentPlanMapping.find(
    (plan) => plan.payment_condition.description === conditionEnum
  )?.payment_condition;
}
