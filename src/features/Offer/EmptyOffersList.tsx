import { EmptyList } from "../../components/EmptyList";

export const EmptyOffersList = () => {
  return (
    <EmptyList
      buttonLabel="Ver categorias"
      title="Você não possui ofertas para essa categoria :("
    >
      <p className="text-sm text-neutral-500 ">
        Mas não se preocupe! Você pode conferir outras categorias de ofertas.
      </p>
    </EmptyList>
  );
};
