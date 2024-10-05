import type { GetServerSideProps, NextPage } from "next";
import { Flex } from "../../../components/Flex";
import { Layout } from "../../../components/Layout";
import mockedOffers from "../../../utils/mocks/offer";
import { groupByCategory } from "../../../utils/helpers/offer";
import { Basket, Offer } from "../../../interfaces/Offer";
import { useContext, useState } from "react";
import { ReplaceModal } from "../../../features/Offer/Modal/ReplaceModal";
import { OfferBasketCategory } from "../../../features/Offer/Categories/OfferCategory";
import { PageTitle } from "../../../components/Layout/PageTitle";
import { CartItem } from "../../../interfaces/Cart";
import { DeleteModal } from "../../../features/Offer/Modal/DeleteModal";
import { getBasket } from "../../../http/queries/basket/getBasket";
import { Company } from "../../../interfaces/User";
import { useBasket } from "../../../http/hooks/basket/useBasket";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { useMultiBaskets } from "../../../provider/Basket/MultiBasketsProvider";
import { removeOfferFromMultiBasket } from "../../../provider/Basket/action";
import { toast } from "react-toastify";
import { useModal } from "../../../utils/hooks/useModal";
import { OfferCategorySkeleton } from "../../../features/Offer/Categories/OfferCategorySkeleton";

interface Props {
  basketId: string;
  initialBasket: Basket;
}

const BasketRecommendation: NextPage<Props> = ({ basketId, initialBasket }) => {
  const [groupedOffers, setGroupedOffers] = useState<Record<string, Offer[]>>(
    {}
  );
  const { selectedCompany } = useContext(AuthContext);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(
    // mockedOffers[0]
    Object.values(groupedOffers)?.[0]?.[0]
  );

  const { data, isFetching } = useBasket({
    basketId: Number(basketId),
    companyId: selectedCompany?.id || 0,
    options: {
      enabled: !!selectedCompany,
      initialData: initialBasket,
      refetchOnWindowFocus: false,
      onSuccess: (basket) => {
        setGroupedOffers(groupByCategory(basket.offers_list));
      },
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const handleSelectedOffer = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const handleSelectedProduct = (cartItem: CartItem) => {
    setSelectedProduct(cartItem);
  };

  const { dispatch } = useMultiBaskets();

  const { closeModal } = useModal({ modalId: "deleteProduct" });

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    dispatch(
      removeOfferFromMultiBasket({
        basketId: Number(basketId),
        offerId: selectedProduct.id,
      })
    );
    toast.success("Produto removido da cesta com sucesso");
    closeModal();
  };

  return (
    <Layout subtitle={data?.type_basket.description}>
      <Flex direction="col" className="mt-8 w-full">
        <PageTitle
          title={data?.type_basket.description || "Sua recomendação de compra"}
        />
        <Flex direction="col" justify="center" className="gap-8">
          {isFetching ? (
            <OfferCategorySkeleton />
          ) : (
            Object.entries(groupedOffers).map(([category, offers]) => (
              <OfferBasketCategory
                key={category}
                basketId={Number(basketId)}
                handleSelectedOffer={handleSelectedOffer}
                handleSelectedProduct={handleSelectedProduct}
                category={category}
                offers={offers}
              />
            ))
          )}
          {selectedOffer && selectedOffer.similar_offers && (
            <ReplaceModal
              basketId={Number(basketId)}
              selectedOffer={selectedOffer}
            />
          )}
          <DeleteModal
            deleteCallback={handleDeleteProduct}
            selectedProduct={selectedProduct}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { basketId } = context.params as { basketId: string };
  try {
    const company = JSON.parse(
      (context.req.cookies["@ecommerce/company"] || "{}") as unknown as string
    ) as unknown as Company;
    const token = context.req.cookies["@ecommerce/authToken"];
    const initialBasket = await getBasket({
      companyId: company.id,
      basketId: Number(basketId),
      token,
    });
    return {
      props: {
        initialBasket,
        basketId,
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

export default BasketRecommendation;
