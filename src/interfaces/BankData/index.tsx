export interface BankData {
  id: number;
  account: string;
  agency: string;
  bank_number: string;
  pix: string;
}
export interface Address {
  id: number;
  city: string;
  complement?: string;
  country: string;
  district: string;
  number?: string;
  state: string;
  street: string;
  zip_code: string;
}

export interface Contact {
  id: number;
  email: string;
  is_wpp: boolean;
  phone: string;
}

export interface PaymentCondition {
  id: number;
  description: string;
}
export interface PaymentMethod {
  id: number;
  description: string;
}

export interface PaymentPlan {
  id: number;
  description: string;
  fee: number;
  payment_method: PaymentMethod;
  payment_condition: PaymentCondition;
}

export enum PaymentMethodEnum {
  PIX = "PIX",
  CREDIT_CARD = "Cartão Crédito",
  BOLETO = "Boleto",
}

export enum PaymentConditionEnum {
  AV = "AV.",
  ONE_TIME = "1x",
  TWO_TIMES = "2x",
  THREE_TIMES = "3x",
  SEVEN_DAYS = "7",
  FOURTEEN_DAYS = "14",
  TWENTY_ONE_DAYS = "21",
  TWENTY_EIGHT_DAYS = "28",
}

export const paymentPlanMapping = [
  {
    id: 1,
    payment_method: {
      id: 1,
      description: "PIX",
    },
    payment_condition: {
      id: 1,
      description: "AV.",
    },
    description: "PIX",
    fee: "0.00",
  },
  {
    id: 2,
    payment_method: {
      id: 2,
      description: "Boleto",
    },
    payment_condition: {
      id: 1,
      description: "AV.",
    },
    description: "Boleto AV.",
    fee: "0.00",
  },
  {
    id: 3,
    payment_method: {
      id: 2,
      description: "Boleto",
    },
    payment_condition: {
      id: 2,
      description: "7",
    },
    description: "Boleto 7 dias",
    fee: "1.00",
  },
  {
    id: 4,
    payment_method: {
      id: 2,
      description: "Boleto",
    },
    payment_condition: {
      id: 3,
      description: "14",
    },
    description: "Boleto 7/14 dias",
    fee: "2.00",
  },
  {
    id: 5,
    payment_method: {
      id: 2,
      description: "Boleto",
    },
    payment_condition: {
      id: 4,
      description: "21",
    },
    description: "Boleto 7/14/21 dias",
    fee: "3.00",
  },
  {
    id: 6,
    payment_method: {
      id: 2,
      description: "Boleto",
    },
    payment_condition: {
      id: 5,
      description: "28",
    },
    description: "Boleto 7/14/21/28 dias",
    fee: "4.00",
  },
  {
    id: 7,
    payment_method: {
      id: 3,
      description: "Cartão Crédito",
    },
    payment_condition: {
      id: 6,
      description: "1x",
    },
    description: "Cartão Crédito 1x",
    fee: "2.89",
  },
  {
    id: 8,
    payment_method: {
      id: 3,
      description: "Cartão Crédito",
    },
    payment_condition: {
      id: 7,
      description: "2x",
    },
    description: "Cartão Crédito 2x",
    fee: "3.59",
  },
  {
    id: 9,
    payment_method: {
      id: 3,
      description: "Cartão Crédito",
    },
    payment_condition: {
      id: 8,
      description: "3x",
    },
    description: "Cartão Crédito 3x",
    fee: "3.59",
  },
];

export const paymentMapping: {
  [key in PaymentMethodEnum]: PaymentConditionEnum[];
} = {
  [PaymentMethodEnum.PIX]: [PaymentConditionEnum.AV],
  [PaymentMethodEnum.CREDIT_CARD]: [
    PaymentConditionEnum.ONE_TIME,
    PaymentConditionEnum.TWO_TIMES,
    PaymentConditionEnum.THREE_TIMES,
  ],
  [PaymentMethodEnum.BOLETO]: [
    PaymentConditionEnum.AV,
    PaymentConditionEnum.SEVEN_DAYS,
    PaymentConditionEnum.FOURTEEN_DAYS,
    PaymentConditionEnum.TWENTY_ONE_DAYS,
    PaymentConditionEnum.TWENTY_EIGHT_DAYS,
  ],
};
