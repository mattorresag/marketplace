import { useState } from "react";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useCombobox } from "downshift";
import { Offer } from "../../../interfaces/Offer";
import { Flex } from "../../Flex";
import { ImageWithFallback } from "../../ImageWithFallback";
import SampleProductImage from "/public/assets/images/sample/sampleProductImage.png";
import { getOffers } from "../../../http/queries/offer/getOffers";
import { token } from "../../../http/queries/token";

const debouncedSearch = debounce(async (query: string, setInputItems) => {
  const response = await getOffers({
    token: token(),
    params: { query },
  });
  setInputItems(response);
}, 500);

const ProductsSearchInput = () => {
  const [inputItems, setInputItems] = useState<Offer[]>([]);
  const router = useRouter();

  const handleSearch = (query: string) => {
    debouncedSearch(query, setInputItems);
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => `${item?.id}` || "",
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) handleSearch(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      router.push(`/ofertas/oferta/${selectedItem?.id}`);
    },
  });

  return (
    <div className="w-full relative">
      <input
        {...getInputProps()}
        className="input input-md w-full"
        placeholder="Digite o nome do produto..."
      />
      <ul
        className={`w-full absolute input input-md bg-white mt-1 shadow-md h-fit max-h-[150px] overflow-x-hidden p-0 z-10 ${
          !(isOpen && inputItems.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={`py-2 px-3 shadow-sm flex flex-col cursor-pointer  ${
                highlightedIndex === index ? "bg-blue-300" : ""
              } ${selectedItem === item ? "font-bold" : ""}`}
              key={`${item.id}${index}`}
              {...getItemProps({ item, index })}
            >
              <Flex align="center" className="gap-4">
                <ImageWithFallback
                  fallbackSrc={SampleProductImage.src}
                  src={
                    item.commercial_product.base_product?.image ||
                    SampleProductImage.src
                  }
                  alt={
                    item.commercial_product.base_product?.description || "Teste"
                  }
                  width={50}
                  height={50}
                />
                <span>{item.commercial_product.base_product?.description}</span>
              </Flex>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsSearchInput;
