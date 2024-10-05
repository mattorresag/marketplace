import { Offer } from "../../interfaces/Offer";
import { CoverageArea } from "../../interfaces/Seller";

const mockedOffers = Array.from({ length: 70 }, (_, index): Offer => {
  const idOffset = index; // Starting from 3 because we already have 1 and 2
  const categoryIndex = Math.floor(idOffset / 10); // -1 because idOffset starts from 3

  return {
    id: idOffset,
    active: idOffset % 2 === 0,
    discount_percentage: `${10 + idOffset}`,
    custom_price_value: `${10 + idOffset}.99`,
    client: 100 + idOffset,
    commercial_product: {
      id: 200 + idOffset,
      active: idOffset % 2 === 0,
      unit_value: 100 + 10 * idOffset,
      base_product: {
        id: 300 + idOffset,
        identifier_code: `ID_${String.fromCharCode(64 + idOffset)}`,
        description: `Description for Product ${String.fromCharCode(
          64 + idOffset
        )}.`,
        image: `path/to/image${String.fromCharCode(64 + idOffset)}.jpg`,
        validated: idOffset % 2 === 0,
        sub_category: {
          id: 400 + categoryIndex,
          description: `SubCategory ${String.fromCharCode(64 + categoryIndex)}`,
          category: {
            id: 500 + categoryIndex,
            description: `Category ${String.fromCharCode(64 + categoryIndex)}`,
          },
        },
      },
      seller: {
        id: 600 + idOffset,
        active: idOffset % 2 === 0,
        cnpj: `${12 + idOffset}.345.678/9012-34`,
        commission: `${5 + idOffset}`,
        company_name: `Seller Company ${String.fromCharCode(64 + idOffset)}`,
        coverage_area:
          idOffset % 2 === 0
            ? CoverageArea.SAO_PAULO
            : CoverageArea.RIO_DE_JANEIRO,
        delivery_time: 3 + (idOffset % 5),
        delivery_weekdays: idOffset % 2 === 0,
        isFlex: idOffset % 2 !== 0,
        minimum_order: `${100 + idOffset}`,
        partner_since: `2022-01-${String(idOffset).padStart(2, "0")}`,
        trade_name: `Trade ${String.fromCharCode(64 + idOffset)}`,
        base_products: [],
      },
    },
  };
});

// Add 'similar_offers' prop to each offer
mockedOffers.forEach((offer, index) => {
  const similarIndices = [
    (index + 1) % mockedOffers.length,
    (index + 2) % mockedOffers.length,
    (index + 3) % mockedOffers.length,
  ];

  offer.similar_offers = similarIndices.map((i) => mockedOffers[i]);
});

export default mockedOffers;
