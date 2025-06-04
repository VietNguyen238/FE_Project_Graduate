export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
