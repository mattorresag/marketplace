import Icons from "../../../public/assets/images/icons";

export const CATEGORIES: {
  description: string;
  icon: React.ReactNode;
  value: string;
}[] = [
  {
    description: "Todos os Produtos",
    icon: <Icons.Products />,
    value: "todos",
  },
  { description: "Mercearia", icon: <Icons.Candy />, value: "mercearia" },
  { description: "Bazar", icon: <Icons.Basket />, value: "bazar" },
  { description: "Infantil", icon: <Icons.TeddyBear />, value: "infantil" },
  { description: "Congelados", icon: <Icons.Freeze />, value: "congelados" },
  { description: "Farmácia", icon: <Icons.Medicine />, value: "farmacia" },
  { description: "Autos", icon: <Icons.Car />, value: "autos" },
  {
    description: "Hortifruti",
    icon: <Icons.Vegetables />,
    value: "hortifruti",
  },
  { description: "Casa e construção", icon: <Icons.House />, value: "casa" },
  { description: "Açougue", icon: <Icons.Meat />, value: "acougue" },
  {
    description: "Bebidas",
    icon: <Icons.Drink />,
    value: "bebidas",
  },
  {
    description: "Higiene e beleza",
    icon: <Icons.ToiletPaper />,
    value: "higiene",
  },
  {
    description: "Frios e laticínios",
    icon: <Icons.Milk />,
    value: "frios",
  },
  { description: "Eletro", icon: <Icons.Fridge />, value: "eletro" },
  {
    description: "Petshop",
    icon: <Icons.Dog />,
    value: "petshop",
  },
  { description: "Padaria", icon: <Icons.Bread />, value: "padaria" },
  { description: "Limpeza", icon: <Icons.Broom />, value: "limpeza" },
  {
    description: "Suplementos",
    icon: <Icons.Supplement />,
    value: "suplementos",
  },
  {
    description: "Tintas / pinturas",
    icon: <Icons.PaintBrush />,
    value: "tintas",
  },
  { description: "Bebês", icon: <Icons.Baby />, value: "bebes" },
  { description: "Tabacaria", icon: <Icons.Cigarrete />, value: "tabacaria" },
  { description: "Papelaria", icon: <Icons.PaperClip />, value: "papelaria" },
  { description: "Perfumaria", icon: <Icons.Perfume />, value: "perfumaria" },
];
