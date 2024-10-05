import { NextPage } from "next";
import React from "react";
import NotFoundIcon from "../../public/assets/images/icons/404.svg?svgr";
import { Flex } from "../components/Flex";
import { Layout } from "../components/Layout";

const PageNotFound: NextPage = (): JSX.Element => {
  return (
    <Layout subtitle="Erro">
      <Flex
        className="w-full h-full"
        gap="8"
        justify="center"
        align="center"
        direction="col"
      >
        <NotFoundIcon />
        <Flex direction="col" gap="4" className="text-center">
          <p style={{ color: "rgba(0, 109, 242, 1)" }} className="text-3xl">
            <strong>PÁGINA NÃO ENCONTRADA</strong>
          </p>
          <p className="text-lg">
            Nos desculpe pelo transtorno, <br />
            estamos trabalhando nisso
          </p>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default PageNotFound;
