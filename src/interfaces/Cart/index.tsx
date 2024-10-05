import { Offer } from "../Offer";

export interface CartItem extends Offer {
  quantity?: number;
}
