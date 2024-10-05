import React, { useContext } from "react";
import Link from "next/link";
import { Order, statusMap } from "../../../../interfaces/Order";
import { AuthContext } from "../../../../provider/Auth/AuthContext";
import { Flex } from "../../../../components/Flex";
import { Button } from "../../../../components/Button";
import { useHandleBuyAgain } from "../../../../utils/hooks/useHandleBuyAgain";

interface Props {
  order: Order;
}
export const MobileOrderListItem = ({ order }: Props): JSX.Element => {
  const { selectedCompany } = useContext(AuthContext);
  const orderStatusKey = order.status as keyof typeof statusMap;
  const { handleBuyAgain } = useHandleBuyAgain();
  return (
    <Flex
      direction="col"
      className="bg-white rounded-lg shadow-[0_2px_2px_rgba(0,0,0,0.16)]"
    >
      <Flex className={`rounded-t-lg custom-bg-${order.status} `}>
        <Flex
          direction="col"
          justify="center"
          className={`rounded-t-lg custom-bg-${order.status} w-[50%] text-center gap-1  p-4`}
        >
          <p className="font-bold text-neutral-900">Status do Pedido</p>
          <p>{statusMap[orderStatusKey]}</p>
          {orderStatusKey === "AWAITING_PAYMENT" && order.invoice_id && (
            <Link
              href={`/carrinho/pagamento?orderId=${order.id}&invoiceId=${order.invoice_id}`}
            >
              <Button>Ir para pagamento</Button>
            </Link>
          )}
        </Flex>
        <div
          className={`divider divider-horizontal divider-${order.status} custom-bg-${order.status}`}
        />
        <Flex
          direction="col"
          justify="center"
          className={`rounded-lg custom-bg-${order.status} w-[50%] text-center gap-1  p-4`}
        >
          <p className="font-bold text-neutral-900">Número do pedido</p>
          <p>{order.id}</p>
        </Flex>
      </Flex>
      <Flex className="py-2">
        <Flex
          direction="col"
          justify="center"
          className="w-[50%] text-center gap-1  p-4"
        >
          <p className="font-bold text-neutral-500">Estabelecimento</p>
          <p>{selectedCompany?.trade_name}</p>
        </Flex>
        <div className="divider divider-horizontal  m-0" />
        <Flex
          direction="col"
          justify="center"
          className="w-[50%] text-center gap-1  p-4"
        >
          <p className="font-bold text-neutral-500">Previsão de entrega</p>
          <p>{order.calculations.estimated_delivery_date}</p>
        </Flex>
      </Flex>
      <Flex className="py-2">
        <Flex
          direction="col"
          justify="center"
          className="w-[50%] text-center gap-1  p-4"
        >
          <p className="font-bold text-neutral-500">Valor total</p>
          <p>{order.calculations.final_total_value}</p>
        </Flex>
        <div className="divider divider-horizontal  m-0" />
        <Flex
          direction="col"
          justify="center"
          className="w-[50%] text-center gap-1  p-4"
        >
          <p className="font-bold text-neutral-500">Pagamento</p>
          <p>{order.payment_plan.description}</p>
        </Flex>
      </Flex>
      <Flex
        direction="col"
        justify="center"
        className="w-[100%] text-center gap-1  p-4"
      >
        <Button
          onClick={() => handleBuyAgain(order)}
          label="Comprar novamente"
        />
      </Flex>
      <div className="divider m-0" />
      <Flex
        direction="col"
        justify="end"
        className="w-[100%] text-end gap-1 text-primary-500 p-4"
      >
        <Link
          href={`/pedidos/${order.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Ver Detalhes</strong>
        </Link>
      </Flex>
    </Flex>
  );
};
