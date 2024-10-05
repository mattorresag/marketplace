import React from "react";
import Link from "next/link";
import { Flex } from "../../../../components/Flex";
import { Button } from "../../../../components/Button";
import ArrowRight from "/public/assets/images/icons/arrowRight.svg?svgr";
import { Order, statusMap } from "../../../../interfaces/Order";
import { useHandleBuyAgain } from "../../../../utils/hooks/useHandleBuyAgain";

interface Props {
  order: Order;
}
export const DesktopOrderListItem = ({ order }: Props): JSX.Element => {
  const orderStatusKey = order.status as keyof typeof statusMap;
  const { handleBuyAgain } = useHandleBuyAgain();
  return (
    <Flex
      className="bg-white rounded-lg shadow-[0_2px_2px_rgba(0,0,0,0.16)]"
      justify="center"
    >
      <Flex
        direction="col"
        justify="center"
        className={`w-[calc(200%/11)] text-center p-4 custom-bg-${order.status} rounded-l-lg gap-2`}
      >
        <p className="font-bold">Status do Pedido</p>
        <p>{statusMap[orderStatusKey]}</p>
        {orderStatusKey === "AWAITING_PAYMENT" && order.invoice_id && (
          <Link
            href={`/cart/pagamento?orderId=${order.id}&invoiceId=${order.invoice_id}`}
            passHref
          >
            <a>
              <Button label="Ir para pagamento" />
            </a>
          </Link>
        )}
      </Flex>
      <div
        className={`divider divider-horizontal divider-${order.status} custom-bg-${order.status}  m-0`}
      />

      <Flex
        direction="col"
        justify="center"
        className={`w-[calc(160%/11)] text-center gap-1  p-4 custom-bg-${order.status}`}
      >
        <p className="font-bold">Pedido nº</p>
        <p>{order.id}</p>
      </Flex>

      <Flex
        direction="col"
        justify="center"
        className="w-[calc(170%/11)] text-center gap-1  p-4"
      >
        <p className="font-bold">Previsão de entrega</p>
        <p>{order.calculations.estimated_delivery_date}</p>
      </Flex>
      <div className="divider divider-horizontal  m-0" />
      <Flex
        direction="col"
        justify="center"
        className="w-[calc(160%/11)] text-center gap-1  p-4"
      >
        <p className="font-bold">Total</p>
        <p>{order.calculations.final_total_value}</p>
      </Flex>
      <div className="divider divider-horizontal  m-0" />
      <Flex
        direction="col"
        justify="center"
        className="w-[calc(150%/11)] text-center gap-1  p-4"
      >
        <p className="font-bold">Pagamento</p>
        <p>{order.payment_plan.description}</p>
      </Flex>
      <Flex
        direction="col"
        justify="center"
        className="w-[calc(200%/11)] text-center gap-1  p-4"
      >
        <Button
          label="Comprar novamente"
          onClick={() => handleBuyAgain(order)}
        />
      </Flex>
      <Flex
        direction="col"
        justify="center"
        align="end"
        css={{ cursor: "pointer" }}
        className="w-[calc(50%/11)] text-center gap-1  p-4 text-primary-500"
      >
        <Link
          href={`/pedidos/${order.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>
            <ArrowRight />
          </strong>
        </Link>
      </Flex>
    </Flex>
  );
};
