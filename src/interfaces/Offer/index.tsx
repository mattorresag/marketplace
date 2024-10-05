import { CartItem } from "../Cart";
import { Seller } from "../Seller";
import { Client } from "../User";

export interface Offer {
  id: number;
  active: boolean;
  discount_percentage: string | undefined;
  custom_price_value: string | undefined;
  client: Client;
  commercial_product: CommercialProduct;
  similar_offers?: Offer[];
  quantity?: number;
}

export interface CommercialProduct {
  id: number;
  active: boolean;
  unit_value?: number;
  base_product?: BaseProduct;
  seller?: Seller;
}

export interface Basket {
  id: number;
  active: boolean;
  type_basket: {
    description: string;
    id: number;
  };
  offer_date: string;
  offers_list: CartItem[];
}
