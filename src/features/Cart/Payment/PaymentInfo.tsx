import React, { useContext } from "react";
import { Flex } from "../../../components/Flex";
import { useCart } from "../../../provider/Cart/CartProvider";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { formatCurrency } from "../../../utils/helpers/formatters";
import { PaymentMethodEnum } from "../../../interfaces/BankData";

import { useCartValues } from "../../../utils/hooks/useCartValues";

interface Props {
  selectedCondition: number | null;
  selectedMethod: PaymentMethodEnum | null;
}

export const PaymentInfo = ({
  selectedCondition,
  selectedMethod,
}: Props): JSX.Element => {
  const { finalValue, serviceFeeTotal, companyFee, subtotalValue } =
    useCartValues({
      selectedCondition,
      selectedMethod,
    });

  return (
    <Flex
      direction="col"
      className="rounded-md border-2 border-success-500 p-4 gap-8 w-full bg-white"
    >
      <Flex direction="col">
        <h3 className="text-lg font-bold text-neutral-900">Resumo do Pedido</h3>
        <div className="divider m-0" />
        <Flex justify="between" className="gap-16">
          <h5 className="text-sm text-neutral-500">Produtos</h5>
          <h5 className="text-sm text-neutral-500">
            {formatCurrency(subtotalValue)}
          </h5>
        </Flex>
        <Flex justify="between" className="gap-16">
          <h5 className="text-sm text-neutral-500">
            Serviços ecommerce ({companyFee}%)
          </h5>
          <h5 className="text-sm text-neutral-500">
            {formatCurrency(serviceFeeTotal)}
          </h5>
        </Flex>
        <Flex justify="between" className="gap-16">
          <h5 className="text-sm text-neutral-500">Frete Grátis</h5>
          <h5 className="text-sm text-neutral-500">R$ 0,00</h5>
        </Flex>
      </Flex>
      <Flex justify="between" className="gap-16">
        <h5 className="text-sm font-bold text-neutral-900">Valor Final</h5>
        <h5 className="text-sm text-neutral-500 font-bold">
          {formatCurrency(finalValue)}
        </h5>
      </Flex>
    </Flex>
  );
};
