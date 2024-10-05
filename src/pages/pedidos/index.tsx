import { GetServerSideProps, NextPage } from "next";
import React, { useContext } from "react";
import { Flex } from "../../components/Flex";
import { useOrders } from "../../http/hooks/order/useOrders";
import { useDeviceType } from "../../utils/hooks/useDeviceType";
import { EmptyOrderList } from "../../features/Order/EmptyOrdersList";
import Skeleton from "../../components/Skeleton";
import { Layout } from "../../components/Layout";
import mockedOrders from "../../utils/mocks/order";
import { PageTitle } from "../../components/Layout/PageTitle";
import { OrderListItem } from "../../features/Order/Item/List";
import { Order } from "../../interfaces/Order";
import { getOrders } from "../../http/queries/order/getOrders";
import { Company } from "../../interfaces/User";
import { AuthContext } from "../../provider/Auth/AuthContext";
interface Props {
  initialOrders: Order[];
}

const Orders: NextPage<Props> = ({ initialOrders }): JSX.Element => {
  const { selectedCompany } = useContext(AuthContext);
  const { isDesktop } = useDeviceType();
  const {
    data: orders,
    isFetched,
    isFetching,
  } = useOrders({
    companyId: selectedCompany?.id || 0,
    options: {
      enabled: !!selectedCompany,
      initialData: initialOrders,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });
  return (
    <Layout subtitle="Pedidos" align="start">
      <Flex direction="col" className="mt-8 w-full">
        <PageTitle title="Meus pedidos" />
        <Flex direction="col" className="gap-4">
          {false && (
            // !isFetching &&
            //   isFetched &&
            //   ordersResources?.resources?.length === 0 &&
            <EmptyOrderList />
          )}
          {/* {isFetching */}
          {false
            ? Array.from(Array(6).keys()).map((value) => (
                <Skeleton
                  height={isDesktop ? "h-[84px]" : "h-[417px]"}
                  key={`skeleton-${value}`}
                />
              ))
            : // : ordersResources?.resources?.map((order) => (
              mockedOrders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
        </Flex>
        {/* <PaginationComponent
        pages={pages}
        totalPages={data?.pages}
        currentPage={currentPage}
        setCurrentPage={handleCurrentPage}
      /> */}
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const token = cookies["@ecommerce/authToken"];
  const company = JSON.parse(
    (context.req.cookies["@ecommerce/company"] || "{}") as unknown as string
  ) as unknown as Company;
  try {
    const initialOrders = await getOrders({ token, companyId: company.id });
    return {
      props: {
        initialOrders,
      },
    };
  } catch (error) {
    return {
      props: {
        initialOrders: [],
      },
    };
  }
};

export default Orders;
