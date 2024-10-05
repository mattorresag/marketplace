export const handleFormatCnpj = (value: string | undefined) => {
  const cnpjCpf = value?.replace(/\D/g, "");
  if (cnpjCpf?.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }
  return cnpjCpf?.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    "$1.$2.$3/$4-$5"
  );
};

export const handleFormatCEP = (cep: string) => {
  const regex = /^(\d{5})(\d{3})$/;
  if (regex.test(cep)) {
    return cep.replace(regex, "$1-$2");
  }
  return cep;
};

export const numberRegex = /^\d+(\.\d+)?$/;

export const formatNumber = (
  number: number,
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat("pt-BR", options).format(number);
};

export const formatCurrency = (amount: number) => {
  return formatNumber(amount, {
    style: "currency",
    currency: "BRL",
  });
};
