import { useContext, useMemo } from "react";
import { Order } from "../../../interfaces/Order";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { useDeviceType } from "../../../utils/hooks/useDeviceType";
import { Flex } from "../../../components/Flex";
import { Button } from "../../../components/Button";
import {
  handleFormatCEP,
  handleFormatCnpj,
  numberRegex,
} from "../../../utils/helpers/formatters";
import { download } from "../../../utils/helpers/download";
import Icons from "../../../../public/assets/images/icons";
import { OrderSteps } from "./OrderSteps";
import { useHandleBuyAgain } from "../../../utils/hooks/useHandleBuyAgain";

interface Props {
  order: Order;
}

const DetailsOrder = ({ order }: Props) => {
  const { handleBuyAgain } = useHandleBuyAgain();

  const { user } = useContext(AuthContext);

  // const handleExport = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   download(
  //     `orders/${order.id}/report`,
  //     {
  //       isAdmin: user?.is_superuser,
  //     },
  //     {
  //       filename: `order-${order.id}-report-${new Date().toISOString()}`,
  //       fileExtension: "pdf",
  //       forceDefaultDownloaded: true,
  //       responseType: "blob",
  //     }
  //   );
  // };

  const { isTablet } = useDeviceType();

  return (
    <>
      <Flex justify="between" align="center" className="mb-6 mt-2">
        <p className="font-semibold text-[24px]">Pedido nº {order.id}</p>
        <Flex>
          <Button
            onClick={() => handleBuyAgain(order)}
            label="Comprar novamente"
          />
        </Flex>
      </Flex>
      <Flex direction="col" className="bg-white rounded-lg p-6 gap-2">
        <Flex
          justify="between"
          direction={isTablet ? "row" : "col"}
          className="mb-2 gap-6"
        >
          <Flex justify="between">
            <p className="font-semibold text-[22px] md:text-[18px]">
              Detalhes do pedido
            </p>
          </Flex>
          {/* <Flex
            className="cursor-pointer gap-2"
            onClick={(e) => handleExport(e)}
          >
            <Icons.Paste />
            <p className="underline text-primary-500">Exportar pedido</p>
          </Flex> */}
        </Flex>
        <div className="divider m-0" />
        <Flex direction="col" className="w-full px-4 py-4 gap-10 md:flex-row">
          <Flex
            direction="col"
            justify="between"
            className="w-[100%] md:w-[60%] gap-8"
          >
            <Flex
              direction="col"
              justify="between"
              className="w-full md:flex-row gap-2"
            >
              <Flex
                direction="col"
                className="w-[100%] md:w-[calc(100/3)%] gap-1"
              >
                <p className="text-neutral-300">Estabelecimento:</p>
                <h4 className="text-neutral-900">
                  {order?.company?.trade_name}
                </h4>
                <h4 className="text-neutral-900">
                  {handleFormatCnpj(order.company?.cnpj)}
                </h4>
              </Flex>
              <Flex
                direction="col"
                className="w-[100%] md:w-[calc(100/3)%] gap-1"
              >
                <p className="text-neutral-300">Endereço de entrega:</p>
                {order.company?.address?.street &&
                  order.company?.address?.number &&
                  order.company?.address?.city &&
                  order.company?.address?.zip_code && (
                    <>
                      <h4 className="text-neutral-900">
                        {order.company?.address?.street}{" "}
                        {order.company?.address?.number},{" "}
                        {order.company?.address?.city}
                      </h4>
                      <h4>
                        {handleFormatCEP(order?.company?.address?.zip_code)}
                      </h4>
                    </>
                  )}
              </Flex>
              <Flex
                direction="col"
                className="w-[100%] md:w-[calc(100/3)%] gap-1"
              >
                <p className="text-neutral-300">Método de pagamento:</p>
                <h4 className="text-neutral-900">
                  {order.payment_plan.description}
                </h4>
              </Flex>
            </Flex>
            <OrderSteps order={order} />
          </Flex>
          <div className="divider divider-horizontal  m-0" />
          <Flex direction="col" className="w-[100%] md:w-[30%]">
            <Flex
              justify="between"
              className="mt-3 mb-2 text-[18px] font-semibold"
            >
              <h4>Total original</h4>
              <h4>{order?.calculations.original_total_value}</h4>
            </Flex>
            {!!order?.calculations.negotiated_discount && (
              <Flex direction="col">
                <Flex
                  justify="between"
                  className="mt-[-5px]
        text-[18px]
        font-semibold"
                >
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    Desconto
                  </p>
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    - {order?.calculations.negotiated_discount}
                  </p>
                </Flex>
              </Flex>
            )}

            {!!order?.calculations.pre_shortage_discount && (
              <Flex
                justify="between"
                className="mt-[-5px]
        text-[18px]
        font-semibold"
              >
                <p
                  className="text-neutral-300
        text-[12px]
        font-normal"
                >
                  Ruptura pré-faturamento
                </p>
                <p
                  className="text-neutral-300
        text-[12px]
        font-normal"
                >
                  - {order?.calculations.pre_shortage_discount}
                </p>
              </Flex>
            )}
            <Flex justify="end">
              <div className="divider w-32 float-right  m-0" />
            </Flex>
            <Flex
              justify="between"
              className="mt-3
        mb-2
        text-[18px]
        font-semibold"
            >
              <h4>Subtotal</h4>
              <h4>{order?.calculations.total_value}</h4>
            </Flex>
            <Flex direction="col">
              {order?.calculations.tax < 0 && (
                <Flex
                  justify="between"
                  className="mt-[-5px]
        text-[18px]
        font-semibold"
                >
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    Dedução por método de pagamento{" "}
                    {numberRegex.test(`${order.payment_plan.fee}`) &&
                      `${Number(order.payment_plan.fee) * 100}%`}
                  </p>
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    {" "}
                    {order?.calculations.tax}
                  </p>
                </Flex>
              )}
              {order.calculations.service_fee > 0 && (
                <Flex
                  justify="between"
                  className="mt-[-5px]
        text-[18px]
        font-semibold"
                >
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    Serviços ecommerce
                  </p>
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    + {order?.calculations.service_fee ?? 0}
                  </p>
                </Flex>
              )}
              {order?.calculations.tax > 0 && (
                <Flex
                  justify="between"
                  className="mt-[-5px]
        text-[18px]
        font-semibold"
                >
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    Adição por método de pagamento{" "}
                  </p>
                  <p
                    className="text-neutral-300
        text-[12px]
        font-normal"
                  >
                    + {order?.calculations.tax}
                  </p>
                </Flex>
              )}
              {!!order?.calculations?.coupon_discount &&
                !!order?.applied_coupon_code && (
                  <Flex
                    justify="between"
                    className="mt-[-5px]
        text-[18px]
        font-semibold"
                  >
                    <p
                      className="text-neutral-300
        text-[12px]
        font-normal"
                    >
                      Cupom <strong>{order?.applied_coupon_code}</strong>
                    </p>
                    <p
                      className="text-neutral-300
        text-[12px]
        font-normal"
                    >
                      - {order?.calculations.coupon_discount}
                    </p>
                  </Flex>
                )}
              <Flex
                justify="between"
                className="mt-[-5px]
        text-[18px]
        font-semibold"
              >
                <p
                  className="text-neutral-300
        text-[12px]
        font-normal"
                >
                  Frete
                </p>
                <p
                  className="text-green-500
        text-[12px]
        font-normal "
                >
                  Grátis
                </p>
              </Flex>
            </Flex>
            <Flex justify="end">
              <div className="divider w-32 float-right  m-0" />
            </Flex>
            <Flex
              justify="between"
              className="mt-3
        mb-2
        text-[18px]
        font-semibold"
            >
              <h3>Valor final</h3>
              <h4>{order?.calculations.final_total_value}</h4>
            </Flex>

            {order.observation && (
              <Flex direction="col" className="gap-2">
                <p className="text-neutral-300">Observações</p>
                <p className="break-words">{order.observation}</p>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DetailsOrder;
