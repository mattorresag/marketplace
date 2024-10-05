import React from "react";
import Image from "next/image";

import providerIcon from "/public/assets/images/illustrations/steps_provider.png";
import deliveryIcon from "/public/assets/images/illustrations/steps_delivery.png";

import {
  Order,
  OrderStatus,
  OrderStatusArray,
  statusMap,
} from "../../../interfaces/Order";
import { Flex } from "../../../components/Flex";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Icons from "../../../../public/assets/images/icons";

interface Props {
  order: Order;
}

const tz = { timeZone: "America/Brasilia" };

const colors = {
  firstCircleGrey: "#9EA3A5",
  grey: "#A1A1A1",
  green: "#48B748",
};

const handleFillColors = (status: OrderStatus) => {
  return {
    circles: {
      firstCircle:
        OrderStatusArray.indexOf(status) < 4 || status === "CANCELED"
          ? colors.firstCircleGrey
          : colors.green,
      secondCircle:
        OrderStatusArray.indexOf(status) < 5 || status === "CANCELED"
          ? colors.grey
          : colors.green,
      thirdCircle: ["DELIVERED", "FINISHED"].includes(status)
        ? colors.green
        : colors.grey,
    },
    lines: {
      firstLine:
        OrderStatusArray.indexOf(status) < 4 || status === "CANCELED"
          ? colors.grey
          : colors.green,
      secondLine:
        OrderStatusArray.indexOf(status) < 5 || status === "CANCELED"
          ? colors.grey
          : colors.green,
      thirdLine: ["DELIVERED", "FINISHED", "PARTIALLY_DELIVERED"].includes(
        status
      )
        ? colors.green
        : colors.grey,
      fourthLine: ["DELIVERED", "FINISHED"].includes(status)
        ? colors.green
        : colors.grey,
    },
  };
};

const handleStepsText = (status: OrderStatus) => {
  return {
    firstStep: `Pedido ${status === "IN_QUESTION" ? "em análise" : "aprovado"}`,
    secondStep: () => {
      if (status === "REQUESTED") return "Solicitado";
      return ["PARTIALLY_DELIVERED", "DELIVERED", "FINISHED"].includes(status)
        ? "Envio iniciado"
        : "Início do envio";
    },
    thirdStep: ["DELIVERED", "FINISHED"].includes(status)
      ? "Finalizado"
      : "Previsão de conclusão",
  };
};

export const OrderSteps = ({ order }: Props): JSX.Element => {
  const { status } = order;

  const fillColors = handleFillColors(status);
  const stepsText = handleStepsText(status);

  const formattedDeliveryDate =
    order.delivery_date &&
    format(new Date(order.delivery_date), "dd/MM/yyyy", { locale: ptBR });

  const formattedEstimatedDeliveryDate =
    order.calculations?.estimated_delivery_date;

  return (
    <Flex direction="col" gap="1">
      <Flex className="relative w-[100%] md:px-12 sm:px-0">
        <Flex direction="col" gap="4">
          <Flex>
            <svg height="50" width="32">
              <circle
                cx="16"
                cy="20"
                r="16"
                stroke={colors.grey}
                strokeWidth={0}
                fill={fillColors.circles.firstCircle}
              />
            </svg>
          </Flex>
        </Flex>
        <Flex direction="col" gap="4">
          <Flex align="start" className="relative">
            <svg height="50" width="100%">
              <line
                x1="0"
                y1="20"
                x2="100%"
                y2="20"
                stroke={fillColors.lines.firstLine}
                strokeWidth={6}
              />
            </svg>
          </Flex>
        </Flex>
        {status === "REQUESTING" && (
          <>
            <Flex
              direction="col"
              align="center"
              justify="center"
              className="absolute left-[19.5%] top-[-15px] sm:left-[21%] md:left-[26%] "
            >
              <Flex justify="center">
                <Image
                  quality={100}
                  layout="fixed"
                  src={providerIcon}
                  alt="provider icon"
                />
              </Flex>
            </Flex>
            <Flex
              direction="col"
              align="center"
              justify="center"
              className="absolute w-[50%] left-[3%] top-[-55px] sm:left-[0%] sm:top-[-40px]  md:left-[6%] lg:left-[5%] "
            >
              <p className="text-center text-sm text-secondary-500">
                {statusMap[status]}
              </p>
            </Flex>
          </>
        )}
        <Flex direction="col" gap="4">
          <Flex>
            <svg height="50" width="100%">
              <line
                x1="0"
                y1="20"
                x2="100%"
                y2="20"
                stroke={fillColors.lines.secondLine}
                strokeWidth={6}
              />
            </svg>
          </Flex>
        </Flex>
        <Flex direction="col" gap="4">
          <Flex>
            <svg height="50" width="32">
              <circle
                cx="16"
                cy="20"
                r="16"
                stroke={colors.grey}
                strokeWidth={0}
                fill={fillColors.circles.secondCircle}
              />
            </svg>
          </Flex>
        </Flex>
        <Flex direction="col" gap="4">
          <Flex>
            <svg height="50" width="100%">
              <line
                x1="0"
                y1="20"
                x2="100%"
                y2="20"
                stroke={fillColors.lines.thirdLine}
                strokeWidth={6}
              />
            </svg>
          </Flex>
        </Flex>
        {status === "PARTIALLY_DELIVERED" && (
          <>
            <Flex
              direction="col"
              align="center"
              justify="center"
              className="absolute right-[21%] sm:right-[24%] md:right-[27%] lg:right-[26%]"
            >
              <Flex justify="center">
                <Image
                  quality={100}
                  layout="fixed"
                  src={deliveryIcon}
                  alt="provider icon"
                />
              </Flex>
            </Flex>
            <Flex
              direction="col"
              align="center"
              justify="center"
              className="absolute w-[50%] right-[3.5%] top-[-50px] sm:right-[3%] sm:top-[-60px]  md:right-[7%] lg:top-[-50px] lg:right-[5%] "
            >
              <Flex justify="center">
                <p className="w-[100%] sm:w-[60%] text-center text-sm text-secondary-500">
                  Seus produtos estão chegando até você
                </p>
              </Flex>
            </Flex>
          </>
        )}
        <Flex direction="col">
          <Flex>
            <svg height="50" width="100%">
              <line
                x1="0"
                y1="20"
                x2="100%"
                y2="20"
                stroke={fillColors.lines.fourthLine}
                strokeWidth={6}
              />
            </svg>
          </Flex>
        </Flex>
        <Flex direction="col" className="relative">
          <Flex className="absolute top-[3.2px] left-[2px]">
            <Icons.CheckCircle className="w-[2rem] h-[2rem]" />
          </Flex>
        </Flex>
        <Flex direction="col">
          <svg height="60" width="37">
            <circle
              cx="18"
              cy="20"
              r="16"
              stroke={fillColors.circles.thirdCircle}
              strokeWidth={5}
              fill={fillColors.circles.thirdCircle}
            />
          </svg>
        </Flex>
      </Flex>
      <Flex className="w-[calc(100%-2px)]" justify="center">
        <Flex className=" w-[calc(100%/3)]">
          <p className="text-neutral-300">{stepsText.firstStep}</p>
        </Flex>
        <Flex justify="center" className=" w-[calc(100%/3)]">
          <p className="text-center text-neutral-300">
            {stepsText.secondStep()}
          </p>
        </Flex>
        <Flex justify="end" className=" w-[calc(100%/3)]">
          <Flex justify="center" className=" w-fit" align="end" direction="col">
            <p className="text-end md:text-center text-neutral-300">
              {stepsText.thirdStep}
            </p>
            <p className="text-end md:text-center">
              {["DELIVERED", "FINISHED"].includes(status)
                ? formattedDeliveryDate
                : formattedEstimatedDeliveryDate}
            </p>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
