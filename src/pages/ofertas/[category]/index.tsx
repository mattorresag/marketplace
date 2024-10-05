import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { Offer } from "../../../interfaces/Offer";
import { Layout } from "../../../components/Layout";
import OfferItem from "../../../components/Offer";
import { Flex } from "../../../components/Flex";
import OfferLoading from "../../../features/Offer/OfferLoading";
import { EmptyOffersList } from "../../../features/Offer/EmptyOffersList";
import { PageTitle } from "../../../components/Layout/PageTitle";
import { DeleteModal } from "../../../features/Offer/Modal/DeleteModal";
import { CartItem } from "../../../interfaces/Cart";
import { useHandleCart } from "../../../utils/hooks/useHandleCart";
import { useCart } from "../../../provider/Cart/CartProvider";
import { removeCartItem } from "../../../provider/Cart/actions";
import { toast } from "react-toastify";
import { useModal } from "../../../utils/hooks/useModal";
import { getOffers } from "../../../http/queries/offer/getOffers";
import { useOffers } from "../../../http/hooks/offer/useOffers";
import { PaginationComponent } from "../../../components/PaginationComponent";
import { AxiosPaginatingResponse } from "../../../interfaces/Axios";

interface Props {
  initialOffers: Offer[];
  category: string;
}

const CategoryOffers: NextPage<Props> = ({
  initialOffers,
  category,
}): JSX.Element => {
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();
  const itemsPerPage = 10;
  const { dispatch } = useCart();
  const { closeModal } = useModal({ modalId: "deleteProduct" });

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    dispatch(removeCartItem(selectedProduct));
    toast.success("Produto removido do carrinho com sucesso");
    closeModal();
  };
  const { handleAddProductToCart } = useHandleCart();
  const { data, isFetching, isFetched } = useOffers({
    nextUrl: currentUrl,
    params: {
      category: category === "todos" ? undefined : category,
      limit: itemsPerPage,
    },
    options: {
      initialData: { results: initialOffers, count: initialOffers.length },
      refetchOnWindowFocus: false,
    },
  });

  return (
    <Layout subtitle="Explorar">
      <Flex
        className="w-full h-full mt-8 gap-4"
        direction="col"
        justify="center"
        align="center"
      >
        <PageTitle title={category.at(0)?.toUpperCase() + category.slice(1)} />
        {!isFetching && isFetched && data?.results.length === 0 && (
          <EmptyOffersList />
        )}
        <Flex className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isFetching
            ? Array.from(Array(6).keys()).map((value) => (
                <OfferLoading key={`skeleton-${value}`} />
              ))
            : data?.results.map((offer) => (
                <Flex
                  key={offer.id}
                  onClick={() => setSelectedProduct(offer as CartItem)}
                >
                  <OfferItem
                    handleAdd={handleAddProductToCart}
                    isExploring
                    offer={offer}
                  />
                </Flex>
              ))}
        </Flex>
        <PaginationComponent
          baseParam={`/offer/?category=${category}`}
          count={data?.count}
          next={data?.next}
          previous={data?.previous}
          setCurrentUrl={(url) => setCurrentUrl(url)}
          itemsPerPage={itemsPerPage}
        />
      </Flex>
      <DeleteModal
        deleteCallback={handleDeleteProduct}
        selectedProduct={selectedProduct as CartItem}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params as { category: string };
  try {
    const token = context.req.cookies["@ecommerce/authToken"];
    const initialOffers = (await getOffers({
      token,
      params: { category, limit: 1 },
    })) as AxiosPaginatingResponse<Offer>;
    if (initialOffers)
      initialOffers.results.sort(
        (a, b) =>
          Number(b.discount_percentage || 0) -
          Number(a.discount_percentage || 0)
      );
    return {
      props: {
        initialOffers: initialOffers.results,
        category,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
export default CategoryOffers;
