import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Offer } from "../../../../interfaces/Offer";
import { Layout } from "../../../../components/Layout";
import { OfferDetailsSkeleton } from "../../../../features/Offer/Details/OfferDetailsSkeleton";
import { Flex } from "../../../../components/Flex";
import CategoryTree from "../../../../features/Offer/Details/CategoryTree";
import OfferDetailsCard from "../../../../features/Offer/Details/OfferDetails";
import mockedOffers from "../../../../utils/mocks/offer";
import { getOffer } from "../../../../http/queries/offer/getOffer";
import { useOffer } from "../../../../http/hooks/offer/useOffer";

interface Props {
  offerId: string;
  initialOffer: Offer;
}

const OfferDetails: NextPage<Props> = ({ offerId, initialOffer }) => {
  const { data, isFetching } = useOffer({
    offerId,
    options: {
      refetchOnWindowFocus: false,
      initialData: initialOffer,
      // onSuccess: (response) =>
      //     setSortedSimilarOffers(
      //         response?.resources.similarOffers.sort((a) => {
      //             if (
      //                 response.resources.offer.customPrices[0]
      //                     ?.referenceProduct?.name === a.product.name
      //             )
      //                 return -1;
      //             return 1;
      //         })
      //     ),
    },
  });

  return (
    <Layout subtitle={`Oferta ${offerId}`}>
      <Flex direction="col" className="w-full mt-4">
        {isFetching && <OfferDetailsSkeleton />}

        {!isFetching && data && (
          <>
            <CategoryTree offer={data || initialOffer} />
            <OfferDetailsCard offer={data || initialOffer} />
          </>
        )}

        {/* {!isFetching &&
          sortedSimilarOffers &&
          sortedSimilarOffers?.length > 0 && (
            <>
              <h1 className="similar-offers-title">Produtos Similares</h1>

              <div className="productList-container">
                {sortedSimilarOffers?.map((_offer: Offer, index) => {
                  return (
                    <OfferComponent
                      referenceProduct={data?.resources.offer}
                      handleRefetch={handleRefetch}
                      showTooltip={
                        data?.resources.offer.customPrices[0]?.referenceProduct
                          ?.name
                          ? index === 1
                          : index === 0
                      }
                      isDetailsPage
                      key={_offer.id}
                      offer={_offer}
                    />
                  );
                })}
              </div>
            </>
          )} */}
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { offerId } = context.params as { offerId: string };
  try {
    const token = context.req.cookies["@ecommerce/authToken"];
    const initialOffer = await getOffer({ token, offerId });

    return {
      props: {
        initialOffer,
        offerId,
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

export default OfferDetails;
