import {RootState} from '../store';
import {apiSlice} from './apiSlice';
import {createEntityAdapter, createSelector, EntityState} from '@reduxjs/toolkit';
import {Coin, CoinGroups} from '@/src/types';


interface CoinsApiResponse {
  data: Coin[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

type CoinPageParam = {
  page: number
  pageSize: number
  currency?: string
}
type CoinHistoryParam = {
  productId: number
  days: number | string
}


export type TransformedCoinHistoryItem = {
  x: number;
  timestamp?: number;
  open: number;
  close: number;
  high: number;
  low: number;
};
const coinAdapter = createEntityAdapter<Coin>();
const initialState = coinAdapter.getInitialState();


export const apiSliceWithCoins = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: we should have an api to get the grouped coins i made pageSize 50 just for the performance we should get all the data
    getGroupedCoins: builder.query<EntityState<Coin, string>, void>({
      query: () => '/coin-prices-all?currency=usd&page=1&pageSize=50',
      transformResponse(res: CoinsApiResponse) {
        return coinAdapter.setAll(initialState, res.data);
      },
    }),
    getCoinHistory: builder.query<TransformedCoinHistoryItem[], CoinHistoryParam>({
      query: ({productId, days}) => `/coin-ohlc?productId=${productId}&days=${days}`,
    }),
    getCoinsPaginated: builder.infiniteQuery<
      CoinsApiResponse,        // response from the server
      void,                    // queryArg passed from hook
      CoinPageParam            // pageParam
    >({
      // This constructs the request URL
      query: ({pageParam: {page, pageSize, currency = 'usd'}}) => {
        return `coin-prices-all?currency=${currency}&page=${page}&pageSize=${pageSize}`;
      },

      // If you want to transform, you can — but no need for now
      transformResponse: (response: CoinsApiResponse) => response,

      // Configure pagination options
      infiniteQueryOptions: {
        initialPageParam: {
          page: 1,
          pageSize: 10,
          currency: 'usd',
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          const nextPage = lastPageParam.page + 1;
          const remaining = lastPage.totalPages - nextPage;
          return remaining >= 0
            ? {...lastPageParam, page: nextPage}
            : undefined;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          const prevPage = firstPageParam.page - 1;
          return prevPage > 0
            ? {...firstPageParam, page: prevPage}
            : undefined;
        },
      },
    }),
  }),
});
export const {useGetCoinsPaginatedInfiniteQuery, useGetGroupedCoinsQuery, useGetCoinHistoryQuery} = apiSliceWithCoins;


// RTK Query result selector
export const selectCoinsResult = apiSliceWithCoins.endpoints.getGroupedCoins.select();
const selectCoinsPaginatedResult = apiSliceWithCoins.endpoints.getCoinsPaginated.select();
// Data selector (normalized)
export const selectCoinsPaginatedData = createSelector(
  selectCoinsPaginatedResult,
  (result) => result?.data?.pages?.flatMap((page: any) => page.data) ?? []  // Default to empty array if no data
);
export const selectCoinById1 = createSelector(
  selectCoinsPaginatedData,
  (state: RootState, productId: string) => productId,
  (coins, productId) => coins.find(coin => coin.productId === productId)
);

export const selectCoinById = createSelector(
  selectCoinsResult,
  (state: RootState, id: string) => id,
  (coins, id) => coins?.data?.entities?.[id]
);


const selectCoinsData = createSelector(
  selectCoinsResult,
  (result) => result.data ?? initialState
);



// Normalized selectors
export const {selectAll: selectAllCoins} = coinAdapter.getSelectors(
  (state: RootState) => selectCoinsData(state)
);

// Grouped selectors
export const selectGroupedCoins: (state: RootState) => CoinGroups = createSelector(
  selectAllCoins,
  (coins) => {
    const featured = [...coins]
      .sort((a, b) => a.marketCap - b.marketCap)
      .slice(0, 20);

    const topGainers = [...coins]
      .filter((coin) => coin.priceChangePercentage24h > 0)
      .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
      .slice(0, 20);

    const topLosers = [...coins]
      .filter((coin) => coin.priceChangePercentage24h < 0)
      .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
      .slice(0, 20);

    return {featured, topGainers, topLosers};
  }
);
