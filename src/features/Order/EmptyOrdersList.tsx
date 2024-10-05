import { EmptyList } from "../../components/EmptyList";

export const EmptyOrderList = () => {
  return (
    <EmptyList
      buttonLabel="Ver produtos"
      title="Você ainda não realizou nenhum pedido :("
    >
      <p className="text-sm text-neutral-500 ">
        Depois que fizer sua primeira compra, é aqui que você poderá acompanhar
        os status dos seus pedidos.
      </p>
      <p className="text-sm text-neutral-500 ">
        Aqui, você também poderá agilizar o seu abastecimento repetindo um
        pedido anterior!
      </p>
    </EmptyList>
  );
};
