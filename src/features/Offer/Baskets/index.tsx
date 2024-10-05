import React from "react";
import { Basket } from "../../../interfaces/Offer";
import { BaseCard } from "../../../components/Card/BaseCard";
import { EmptyList } from "../../../components/EmptyList";
interface Props {
  baskets?: Basket[] | null;
  handleToggle?: () => void;
}
export const Baskets = ({ baskets, handleToggle }: Props): JSX.Element => {
  if (!baskets || baskets.length === 0) {
    return (
      <EmptyList
        buttonCallback={handleToggle}
        buttonLabel="Ver cestas"
        title="Você não possui nenhuma cesta disponível :("
      >
        <p className="text-sm text-neutral-500 ">
          Mas não se preocupe! Você pode conferir nossas categorias de ofertas.
        </p>
      </EmptyList>
    );
  }
  return (
    <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
      {baskets?.map((basket) => (
        <BaseCard
          description={basket.type_basket.description}
          url={`/recomendacoes/${basket.id}`}
          key={basket.id}
        />
      ))}
    </div>
  );
};
