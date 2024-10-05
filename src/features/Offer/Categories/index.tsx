import React from "react";
import { CATEGORIES } from "../../../utils/constants/utils";
import { BaseCard } from "../../../components/Card/BaseCard";
export const Categories = (): JSX.Element => {
  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
      {CATEGORIES.map((item) => {
        return (
          <BaseCard
            url={`/ofertas/${item.value}`}
            key={item.description}
            icon={item.icon}
            description={item.description}
          />
        );
      })}
    </div>
  );
};
