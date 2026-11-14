const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatCurrency = (value: number) =>
  CURRENCY_FORMATTER.format(value);

export const formatDate = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  return DATE_FORMATTER.format(date);
};

export const toInputDate = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
};
