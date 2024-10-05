import React, { useState } from "react";
import { Flex } from "../../../components/Flex";

import { Button } from "../../../components/Button";
import { PaymentInfo } from "./PaymentInfo";
import { PaymentPlan } from "./PaymentPlan";
import { PaymentObservation } from "./PaymentObservation";
import {
  PaymentConditionEnum,
  PaymentMethodEnum,
} from "../../../interfaces/BankData";

export const Payment = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodEnum | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<number | null>(
    null
  );

  const handleSelectedMethod = (method: PaymentMethodEnum) => {
    setSelectedMethod(method);
  };

  const handleSelectedCondition = (condition: number) => {
    setSelectedCondition(condition);
  };

  return (
    <Flex direction="col" className="gap-8 mt-8 w-full">
      <PaymentPlan
        selectedMethod={selectedMethod}
        handleSelectedMethod={handleSelectedMethod}
        handleSelectedCondition={handleSelectedCondition}
      />
      <PaymentInfo
        selectedMethod={selectedMethod}
        selectedCondition={selectedCondition}
      />
      <PaymentObservation
        checked={checked}
        handleChecked={() => setChecked((oldState) => !oldState)}
      />
      <Flex className="gap-4">
        <Button
          variant="success"
          disabled={!checked}
          label="Finalizar Pedido"
        />
      </Flex>
    </Flex>
  );
};
