const CURRENCY = "USD";

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: CURRENCY,
});

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}
