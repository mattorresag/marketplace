import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";

import EmptyCart from "/public/assets/images/illustrations/empty-cart.svg";

import { AuthContext } from "../../../provider/Auth/AuthContext";
import { useCart } from "../../../provider/Cart/CartProvider";
import {
  removeCartItem,
  updateCartItems,
} from "../../../provider/Cart/actions";
import { Flex } from "../../../components/Flex";
import CartItem from "./CartItem";
import { Button } from "../../../components/Button";
import { Payment } from "../Payment";
import { PageTitle } from "../../../components/Layout/PageTitle";
import { DeleteModal } from "../../Offer/Modal/DeleteModal";
import { toast } from "react-toastify";
import { useModal } from "../../../utils/hooks/useModal";

export const CartList = () => {
  const router = useRouter();

  const { selectedCompany } = useContext(AuthContext);

  const {
    state: { items: cartItems },
    dispatch,
  } = useCart();

  const [arraySelectProducts, setArraySelectProducts] = useState<number[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setArraySelectProducts((prev) => {
      if (prev.includes(parseInt(value, 10))) {
        return [...prev.filter((item) => item !== parseInt(value, 10))];
      }

      return [...prev, parseInt(value, 10)];
    });
  };

  const { closeModal } = useModal({ modalId: "deleteProduct" });

  const handleDeleteAllIds = async () => {
    if (!selectedCompany) return;
    await dispatch(updateCartItems([]));
    setArraySelectProducts([]);
  };

  const handleSelectedAllProducts = () => {
    const selectProducts = cartItems.map((items) => items.id || 0);
    if (arraySelectProducts.length === cartItems.length) {
      setArraySelectProducts([]);
    } else {
      setArraySelectProducts(selectProducts);
    }
  };
  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    dispatch(removeCartItem(selectedProduct));
    toast.success("Produto removido do carrinho com sucesso");
    closeModal();
  };
  const handleIsChecked = (id: number) => {
    return arraySelectProducts.includes(id);
  };

  const handleViewAllProducts = () => {
    router.push("/");
  };

  return (
    <Flex direction="col" className="mt-8 w-full">
      {cartItems.length > 0 && <PageTitle title="Carrinho" />}
      <Flex className="gap-16 flex-col lg:flex-row w-full">
        <Flex direction="col" className="rounded-lg gap-4 w-full lg:w-[65%]">
          {cartItems.length > 0 && (
            <Flex
              justify="between"
              className="md:bg-white rounded-lg p-4 w-full flex-col lg:flex-row gap-4"
            >
              <Flex className="gap-3" align="center">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={handleSelectedAllProducts}
                  checked={arraySelectProducts.length === cartItems.length}
                />
                <span className="text-neutral-500 text-base mt-1.5 ">
                  Selecionar todos
                </span>
              </Flex>
              <Button
                className="max-w-[300px]"
                onClick={handleDeleteAllIds}
                disabled={arraySelectProducts.length === 0}
              >
                {arraySelectProducts.length === cartItems.length ? (
                  <p>Remover todos os produtos</p>
                ) : (
                  <p>Remover produtos selecionados</p>
                )}
              </Button>
            </Flex>
          )}

          {cartItems.length === 0 && (
            <Flex
              justify="center"
              className="flex-col md:flex-row justify-center px-8 gap-4 "
            >
              <Image
                src={EmptyCart}
                alt="nenhum produto adicionado no carrinho"
                className="w-96 md:w-40"
              />
              <Flex direction="col" justify="center" className="px-1">
                <h2 className="text-2xl font-semibold text-center md:mt-9 mb-5 md:text-left">
                  Você ainda não iniciou o seu abastecimento :(
                </h2>
                <h4 className="mb-5 text-center md:text-left">
                  Em nossa página de produtos você encontra o mix completo para
                  a sua padaria!
                </h4>
                <h4 className="mb-5 text-center md:text-left">
                  Assim que clicar no botão <strong>“comprar”</strong> ele será
                  automaticamente adicionado ao seu carrinho.
                </h4>

                <Button onClick={handleViewAllProducts}>
                  <span>Ver produtos</span>
                </Button>
              </Flex>
            </Flex>
          )}
          {cartItems.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.id}
                cartItemProduct={cartItem}
                setSelectedProduct={(cartItem) =>
                  setSelectedProduct(cartItem as CartItem)
                }
                addSelectedProductsCallback={handleCheck}
                checked={handleIsChecked(cartItem.id ?? 0)}
              />
            );
          })}
        </Flex>
        <Flex className="w-full lg:w-[35%]">
          <Payment />
        </Flex>
        <DeleteModal
          deleteCallback={handleDeleteProduct}
          selectedProduct={selectedProduct}
        />
      </Flex>
    </Flex>
  );
};
