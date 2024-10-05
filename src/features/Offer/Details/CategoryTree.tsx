import Link from "next/link";
import { Offer } from "../../../interfaces/Offer";
import { Flex } from "../../../components/Flex";

interface Props {
  offer: Offer;
}

const CategoryTree = ({ offer }: Props) => {
  const categoryTree = [
    offer.commercial_product.base_product?.sub_category?.description,
    offer.commercial_product.base_product?.sub_category?.category.description,
  ];
  return (
    <Flex className="text-primary-500">
      <Link href="/">
        <a className="offer-details-return-button"> página inicial</a>
      </Link>
      {categoryTree.map((categoryName, index) => (
        <>
          <span className="offer-details-return-button mx-3">&gt;</span>
          {index === categoryTree.length - 1 ? (
            <Link
              href={{
                pathname: `/ofertas/${categoryName}`,
              }}
            >
              <a className="offer-details-return-button">{categoryName}</a>
            </Link>
          ) : (
            <span className="offer-details-return-button">{categoryName}</span>
          )}
        </>
      ))}
    </Flex>
  );
};

export default CategoryTree;
