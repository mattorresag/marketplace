import React, { useContext } from "react";
import { Button } from "../../Button";
import { useRouter } from "next/router";
import { useCart } from "../../../provider/Cart/CartProvider";
import Icons from "../../../../public/assets/images/icons";
import { Flex } from "../../Flex";
export const CartButton = (): JSX.Element => {
  const { state } = useCart();
  const router = useRouter();
  return (
    <button
      className="w-fit h-full p-3 rounded-md bg-success-500"
      onClick={() => router.push("/carrinho")}
    >
      <Flex align="center" className="gap-4">
        <Icons.Cart className="fill-none" />
        <span className="text-white font-bold">{state.items.length}</span>
      </Flex>
    </button>
  );
};
