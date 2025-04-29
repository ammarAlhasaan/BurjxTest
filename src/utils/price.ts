export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  }).format(amount);
};

export const abbreviateNumber = (value: number): string => {
  if (value >= 1e12) {return (value / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';}
  if (value >= 1e9) {return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';}
  if (value >= 1e6) {return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';}
  if (value >= 1e3) {return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';}
  return value.toString();
};
