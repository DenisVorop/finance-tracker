const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number) {
  return formatter.format(value);
}

export function parseCurrency(value: string): number {
  return parseInt(value.replace(/\D/g, ""), 10);
}
