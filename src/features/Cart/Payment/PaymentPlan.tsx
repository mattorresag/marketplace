import React, { useEffect, useState } from "react";
import { Flex } from "../../../components/Flex";
import {
  PaymentCondition,
  PaymentConditionEnum,
  PaymentMethodEnum,
  paymentMapping,
} from "../../../interfaces/BankData";
import { usePaymentMethods } from "../../../http/hooks/cart/usePaymentMethods";
import { usePaymentConditions } from "../../../http/hooks/cart/usePaymentConditions";

interface Props {
  selectedMethod: PaymentMethodEnum | null;
  handleSelectedMethod: (method: PaymentMethodEnum) => void;
  handleSelectedCondition: (condition: number) => void;
}

export const PaymentPlan = ({
  selectedMethod,
  handleSelectedCondition,
  handleSelectedMethod,
}: Props): JSX.Element => {
  const { data: paymentMethods } = usePaymentMethods({
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const { data: paymentConditions } = usePaymentConditions({
    options: {
      refetchOnWindowFocus: false,
    },
  });
  const [filteredConditions, setFilteredConditions] = useState<
    PaymentCondition[]
  >([]);

  useEffect(() => {
    if (selectedMethod && paymentConditions) {
      setFilteredConditions(
        paymentConditions?.filter((condition) =>
          paymentMapping[selectedMethod].includes(
            condition.description as PaymentConditionEnum
          )
        )
      );
    } else {
      setFilteredConditions([]);
    }
  }, [selectedMethod, paymentConditions]);

  return (
    <Flex className="gap-8 w-full" direction="col">
      <Flex direction="col" className="gap-4">
        <h2 className="text-md font-bold">Forma de Pagamento</h2>
        <select
          className="select w-[100%] border-neutral-300 border-2"
          onChange={(e) =>
            handleSelectedMethod(e.target.value as PaymentMethodEnum)
          }
        >
          <option disabled selected>
            Selecione uma forma de pagamento
          </option>
          {paymentMethods?.map((paymentMethod) => (
            <option
              key={paymentMethod.id}
              value={
                PaymentMethodEnum[
                  paymentMethod.description as keyof typeof PaymentMethodEnum
                ]
              }
            >
              {paymentMethod.description}
            </option>
          ))}
        </select>
      </Flex>
      <Flex direction="col" className="gap-4">
        <h2 className="text-md font-bold">Condição de Pagamento</h2>
        <select
          className="select w-[100%] border-neutral-300 border-2"
          onChange={(e) => handleSelectedCondition(Number(e.target.value || 0))}
        >
          <option disabled selected>
            Selecione uma condição de pagamento
          </option>
          {filteredConditions?.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.description}
            </option>
          ))}
        </select>
      </Flex>
    </Flex>
  );
};
