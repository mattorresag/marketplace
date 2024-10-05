import React, { useContext, useState } from "react";
import { Flex } from "../../../components/Flex";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import Icons from "../../../../public/assets/images/icons";
import { getDeliveryDate } from "../../../utils/helpers/date";

interface Props {
  checked: boolean;
  handleChecked: () => void;
}

export const PaymentObservation = ({
  checked,
  handleChecked,
}: Props): JSX.Element => {
  const { selectedCompany } = useContext(AuthContext);
  return (
    <Flex className="gap-8" direction="col">
      <Flex
        direction="col"
        className="bg-yellow-200 rounded-md h-full p-4 gap-4"
      >
        <Flex className="gap-2">
          <Icons.MapPin className="text-primary-500" />
          <h2 className="text-md">
            Este pedido será entregue no estabelecimento{" "}
            <strong>{selectedCompany?.trade_name}</strong>
          </h2>
        </Flex>
        <Flex className="gap-2">
          <Icons.Truck className="text-primary-500" />
          <h2 className="text-md">
            Pedindo hoje, receba até <strong>{getDeliveryDate()}</strong>
          </h2>
        </Flex>
      </Flex>
      <Flex direction="col" className="gap-4 h-full">
        <h2 className="text-md font-bold">
          Gostaria de fazer alguma observação?
        </h2>
        <textarea className="textarea border-2 border-neutral-300 rounded-md p-4 h-full" />
      </Flex>
      <Flex className="gap-4" align="center">
        <input
          type="checkbox"
          onChange={handleChecked}
          checked={checked}
          className="checkbox "
        />
        <h2 className="text-md font-bold">
          Confirmo ter revisado o meu pedido e estar de acordo com os produtos e
          as quantidades do carrinho
        </h2>
      </Flex>
    </Flex>
  );
};
