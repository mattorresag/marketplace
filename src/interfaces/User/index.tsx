import { Address, BankData, Contact, PaymentCondition } from "../BankData";

export interface CompanyGroup {
  id: number;
  name: string;
}
export interface CookieUser {
  user: User;
}

export interface User extends IAuthContextUser {
  companies: Company[];
}

export interface Company {
  id: number;
  active: boolean;
  best_shopping_day: string | null;
  cnpj: string;
  cnpj_opening_date: string;
  company_name: string;
  icms_generator: boolean;
  partnership_end: string | null;
  partnership_start: string;
  trade_name: string;
  service_fee: string;
  state_registration: string | null;
  address: Address;
  bank_data: BankData;
  company_group: CompanyGroup;
  contact: Contact[];
  payment_condition: PaymentCondition[];
}

export interface IAuthContextUser {
  id: number;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  email: string;
  phone: string | null;
  company_group: number;
  token?: string;
}

export interface PurchaseHistory {
  id: number;
  seller_cnpj: string;
  purchase_date: string;
  purchased_quantity: number;
  price_paid: string;
  internal_purchase: boolean;
  client: Client;
  base_product: BaseProduct;
}

export interface Client {
  id: number;
  active: boolean;
  best_shopping_day?: string;
  cnpj_opening_date: string;
  company_name: string;
  icms_generator?: boolean;
  partnership_end?: string;
  partnership_start: string;
  trade_name: string;
  service_fee: string;
  state_registration?: string;
  address: Address;
  bank_data: BankData;
  company_group: CompanyGroup;
  contact: Contact[];
  payment_condition: PaymentCondition[];
}
