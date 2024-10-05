import { Address, BankData } from "../BankData";

export enum CoverageArea {
  ACRE = "ACRE",
  ALAGOAS = "ALAGOAS",
  AMAPA = "AMAPA",
  AMAZONAS = "AMAZONAS",
  BAHIA = "BAHIA",
  CEARA = "CEARA",
  DISTRITO_FEDERAL = "DISTRITO_FEDERAL",
  ESPIRITO_SANTO = "ESPIRITO_SANTO",
  GOIAS = "GOIAS",
  MARANHAO = "MARANHAO",
  MATO_GROSSO = "MATO_GROSSO",
  MATO_GROSSO_DO_SUL = "MATO_GROSSO_DO_SUL",
  MINAS_GERAIS = "MINAS_GERAIS",
  PARA = "PARA",
  PARAIBA = "PARAIBA",
  PARANA = "PARANA",
  PERNAMBUCO = "PERNAMBUCO",
  PIAUI = "PIAUI",
  RIO_DE_JANEIRO = "RIO_DE_JANEIRO",
  RIO_GRANDE_DO_NORTE = "RIO_GRANDE_DO_NORTE",
  RIO_GRANDE_DO_SUL = "RIO_GRANDE_DO_SUL",
  RONDONIA = "RONDONIA",
  RORAIMA = "RORAIMA",
  SANTA_CATARINA = "SANTA_CATARINA",
  SAO_PAULO = "SAO_PAULO",
  SERGIPE = "SERGIPE",
  TOCANTINS = "TOCANTINS",
}

export interface Seller {
  id: number;
  active: boolean;
  cnpj?: string;
  commission?: string;
  company_name?: string;
  coverage_area?: CoverageArea;
  delivery_time?: number;
  delivery_weekdays?: boolean;
  isFlex?: boolean;
  minimum_order?: string;
  partner_since?: string;
  partner_until?: string;
  state_registration?: string;
  trade_name?: string;
  address?: Address;
  bank_data?: BankData;
  contact?: number;
  base_products: BaseProduct[];
}
