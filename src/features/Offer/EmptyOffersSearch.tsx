import { EmptyList } from "../../components/EmptyList";

export const EmptyOffersSearch = () => {
  return (
    <EmptyList
      buttonLabel="Ver categorias"
      title="Você não possui ofertas para esse produto :("
    >
      <p className="text-sm text-neutral-500 ">
        Mas não se preocupe! Você pode conferir outras categorias de ofertas.
      </p>
    </EmptyList>
  );
};
