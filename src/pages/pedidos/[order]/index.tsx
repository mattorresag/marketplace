import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { getOrder } from "../../../http/queries/order/getOrder";
import { Order } from "../../../interfaces/Order";
import { useOrder } from "../../../http/hooks/order/useOrder";
import { Layout } from "../../../components/Layout";
import PageLoading from "../../../components/PageLoading";
import { Flex } from "../../../components/Flex";
import { Button } from "../../../components/Button";
import Icons from "../../../../public/assets/images/icons";
import { useRouter } from "next/router";
import DetailsOrder from "../../../features/Order/Details";
import mockedOrders from "../../../utils/mocks/order";
import { OrderTabs } from "../../../features/Order/Tabs/OrderTabs";
interface Props {
  orderId: string;
  initialOrder: Order;
}
const OrderPage: NextPage<Props> = ({
  orderId,
  initialOrder,
}: Props): JSX.Element => {
  // const { data } = useOrder({
  //   options: {
  //     initialData: { resources: initialOrder },
  //     refetchOnWindowFocus: false,
  //   },
  //   orderId,
  // });
  const router = useRouter();
  return (
    <Layout subtitle={`Pedido nº ${orderId}`}>
      {/* {isFetching ? ( */}
      {/* <PageLoading /> */}
      {/* ) : ( */}
      <Flex direction="col" className="w-full mt-8">
        <Flex
          onClick={() => router.back()}
          className="text-primary-500 pl-2 gap-2 w-fit cursor-pointer font-bold"
        >
          <Icons.ArrowLeft /> Voltar
        </Flex>
        {/* {data.resources && ( */}
        {true && (
          <>
            <Flex direction="col" className="p-3 w-full">
              <DetailsOrder order={mockedOrders[0]} />
            </Flex>
            <OrderTabs order={mockedOrders[0]} />
          </>
        )}
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { order: orderId } = context.params as { order: string };
  // const token = context.req.cookies["@ecommerce/authToken"];
  // const initialOrder = await getOrder({ token, orderId });

  return {
    props: {
      // initialOrder,
      orderId,
    },
  };
};

export default OrderPage;
