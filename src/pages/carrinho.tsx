/* eslint-disable no-nested-ternary */
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { CartList } from "../features/Cart/CartList";

const Carrinho: NextPage = () => {
  return (
    <Layout subtitle="Carrinho">
      <CartList />
    </Layout>
  );
};

export default Carrinho;
