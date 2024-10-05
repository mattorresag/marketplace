import React from "react";
import { Header } from "../Header";
import PageMeta from "../PageMeta";
import { Flex } from "../Flex";
import Footer from "../Footer";
interface Props {
  children: React.ReactNode;
  subtitle?: string;
  align?: "center" | "start" | "end";
}
export const Layout = ({
  children,
  subtitle = "Pedidos",
  align = "center",
}: Props): JSX.Element => {
  return (
    <>
      <PageMeta subtitle={subtitle} />
      <div className="w-full min-h-full bg-[#f3f2f7]">
        <Header />
        <Flex
          className="min-h-[calc(100vh-472px)] w-full px-4 mb-8"
          justify="center"
          align={align}
        >
          <Flex className="h-full w-[1120px]">{children}</Flex>
        </Flex>
        <Footer />
      </div>
    </>
  );
};
