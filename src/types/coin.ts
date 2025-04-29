export type Coin = {
  productId: number;
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  marketCap: number;
  tradingVolume: number;
  symbol: number;
  sparkline: number[];
};

export type CoinPrice = {
  open: number;
  high: number;
  low: number;
  close: number;
};

export type CoinHistoryItem = {
  date: number;
  usd: CoinPrice;
  aed: CoinPrice;
};

export type CoinGroups = {
  featured: Coin[];
  topGainers: Coin[];
  topLosers: Coin[];
};
