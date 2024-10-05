import { Offer } from "../../interfaces/Offer";

export const groupByCategory = (offers: Offer[]): Record<string, Offer[]> => {
  return offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const categoryDescription =
      offer.commercial_product.base_product?.sub_category?.category.description;
    if (!categoryDescription) {
      return acc;
    }
    if (!acc[categoryDescription]) {
      acc[categoryDescription] = [];
    }
    acc[categoryDescription].push(offer);
    return acc;
  }, {});
};

export const calculateTotalPercentageSaved = (offers: Offer[]): number => {
  // Calculate total original price and total custom price value for all offers
  let totalOriginalPrice = 0;
  let totalCustomPrice = 0;

  offers.forEach((offer) => {
    const customPriceValue = parseFloat(offer.custom_price_value || "0");
    const discountPercentage = parseFloat(offer.discount_percentage || "0");

    const originalPrice = (customPriceValue * 100) / (100 - discountPercentage);
    totalOriginalPrice += originalPrice;
    totalCustomPrice += customPriceValue;
  });

  // Calculate the percentage saved
  const percentageSaved =
    ((totalOriginalPrice - totalCustomPrice) / totalOriginalPrice) * 100;

  return percentageSaved;
};
