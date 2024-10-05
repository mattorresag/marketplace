import { debounce } from "lodash";
import { FC, useState } from "react";
import { Flex } from "../../../components/Flex";
import { Offer } from "../../../interfaces/Offer";

const debouncedUpdateAmount = debounce((amount, callbackUpdateAmount) => {
  callbackUpdateAmount(amount);
}, 300);

const ProductAmountInput: FC<{
  value: number;
  callbackUpdateAmount: (offer: Offer, amount: number) => void;
  offer: Offer;
}> = ({ value, callbackUpdateAmount, offer }) => {
  const [debounced, setDebounced] = useState<number>(value);

  const handleAmountUpdate = (newValue: number) => {
    setDebounced(newValue);
    debouncedUpdateAmount(newValue, () => {
      callbackUpdateAmount(offer, newValue);
    });
  };

  return (
    <Flex align="center" className="flex items-center w-full border-error-500">
      <button
        onClick={() =>
          handleAmountUpdate(debounced - 1 >= 0 ? debounced - 1 : 0)
        }
        className="h-10 w-10 flex items-center justify-center aspect-square bg-primary-500/25 border-primary-500 rounded-lg disabled:bg-neutral-100"
        disabled={value === 0}
      >
        <svg
          width="15"
          height="2"
          viewBox="0 0 15 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.95581 2C1.67248 2 1.43481 1.904 1.24281 1.712C1.05148 1.52067 0.955811 1.28333 0.955811 1C0.955811 0.716667 1.05148 0.479 1.24281 0.287C1.43481 0.0956664 1.67248 0 1.95581 0H13.9558C14.2391 0 14.4765 0.0956664 14.6678 0.287C14.8598 0.479 14.9558 0.716667 14.9558 1C14.9558 1.28333 14.8598 1.52067 14.6678 1.712C14.4765 1.904 14.2391 2 13.9558 2H1.95581Z"
            fill="#133DA5"
          />
        </svg>
      </button>

      <input
        className="border-neutral-200 font-source-sans-pro text-sm text-neutral-300 ring-neutral-200 ring-1 py-2 px-4 flex-grow mx-3 text-center rounded-lg focus:ring-primary-100 w-12 md:w-12"
        type="number"
        value={debounced}
        min={0}
        onChange={(e) => handleAmountUpdate(parseInt(e.target.value, 10) || 0)}
      />
      <button
        onClick={() => handleAmountUpdate(debounced + 1)}
        className="h-10 w-10 flex items-center justify-center aspect-square bg-success-500 border-success-500 rounded-lg "
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 14C6.71667 14 6.47933 13.904 6.288 13.712C6.096 13.5207 6 13.2833 6 13V8H1C0.716667 8 0.479 7.904 0.287 7.712C0.0956668 7.52067 0 7.28333 0 7C0 6.71667 0.0956668 6.479 0.287 6.287C0.479 6.09567 0.716667 6 1 6H6V1C6 0.716667 6.096 0.479 6.288 0.287C6.47933 0.0956668 6.71667 0 7 0C7.28333 0 7.521 0.0956668 7.713 0.287C7.90433 0.479 8 0.716667 8 1V6H13C13.2833 6 13.5207 6.09567 13.712 6.287C13.904 6.479 14 6.71667 14 7C14 7.28333 13.904 7.52067 13.712 7.712C13.5207 7.904 13.2833 8 13 8H8V13C8 13.2833 7.90433 13.5207 7.713 13.712C7.521 13.904 7.28333 14 7 14Z"
            fill="white"
          />
        </svg>
      </button>
    </Flex>
  );
};
export default ProductAmountInput;
