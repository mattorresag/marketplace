import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { getOffers } from "../../http/queries/offer/getOffers";
import { AxiosPaginatingResponse } from "../../interfaces/Axios";
import { Offer } from "../../interfaces/Offer";
import { Layout } from "../../components/Layout";
import { Flex } from "../../components/Flex";
import { PageTitle } from "../../components/Layout/PageTitle";
import { useOffers } from "../../http/hooks/offer/useOffers";
import { PaginationComponent } from "../../components/PaginationComponent";
import { EmptyOffersList } from "../../features/Offer/EmptyOffersList";
import OfferLoading from "../../features/Offer/OfferLoading";
import OfferItem from "../../components/Offer";
import { CartItem } from "../../interfaces/Cart";
import { useHandleCart } from "../../utils/hooks/useHandleCart";
import { removeCartItem } from "../../provider/Cart/actions";
import { toast } from "react-toastify";
import { useCart } from "../../provider/Cart/CartProvider";
import { useModal } from "../../utils/hooks/useModal";
import { DeleteModal } from "../../features/Offer/Modal/DeleteModal";
import { ParsedUrlQuery } from "querystring";
import { EmptyOffersSearch } from "../../features/Offer/EmptyOffersSearch";
interface Props {
  initialOffersResponse: AxiosPaginatingResponse<Offer> | null;
  query: string;
}
const OfferSearch: NextPage<Props> = ({
  initialOffersResponse,
  query,
}): JSX.Element => {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const itemsPerPage = 10;
  const { data, isFetching, isFetched } = useOffers({
    nextUrl: currentUrl,
    params: {
      query,
      limit: itemsPerPage,
    },
    options: {
      initialData: {
        results: initialOffersResponse?.results || [],
        count: initialOffersResponse?.results.length || 0,
      },
      refetchOnWindowFocus: false,
    },
  });

  const { handleAddProductToCart } = useHandleCart();

  const { dispatch } = useCart();
  const { closeModal } = useModal({ modalId: "deleteProduct" });

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    dispatch(removeCartItem(selectedProduct));
    toast.success("Produto removido do carrinho com sucesso");
    closeModal();
  };

  return (
    <Layout subtitle={`Buscando ${query}`}>
      <Flex
        className="w-full h-full mt-8 gap-4"
        direction="col"
        justify="center"
        align="center"
      >
        <PageTitle title={`Exibindo resultados para "${query}"`} />
        {!isFetching && isFetched && data?.results.length === 0 && (
          <EmptyOffersSearch />
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
          baseParam={`/offer/?search=${query}`}
          count={data?.count}
          next={data?.next}
          previous={data?.previous}
          setCurrentUrl={(url) => setCurrentUrl(url)}
          itemsPerPage={itemsPerPage}
        />
        <DeleteModal
          deleteCallback={handleDeleteProduct}
          selectedProduct={selectedProduct as CartItem}
        />
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const token = context.req.cookies["@ecommerce/authToken"];
  try {
    const initialOffersResponse = (await getOffers({
      token,
      params: { query, limit: 10 },
    })) as AxiosPaginatingResponse<Offer>;
    return {
      props: {
        initialOffersResponse: initialOffersResponse,
        query: query["search"],
      },
    };
  } catch (error) {
    return {
      props: {
        initialOffersResponse: null,
      },
    };
  }
};

export default OfferSearch;
