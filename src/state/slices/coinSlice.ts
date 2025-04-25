import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice';

export interface Coin {
  productId: number
  id: string
  name: string
  image: string
  currentPrice: number
  priceChangePercentage24h: number
  sparkline: number[]
}

// Create an entity adapter for coins
const coinsAdapter = createEntityAdapter();


// Initial state for coins
const initialState = coinsAdapter.getInitialState();

// Define the API slice that interacts with the backend
export const cryptoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoins: builder.query<EntityState<Coin, string>, { currency?: string; page: number; pageSize: number }>({
      query: ({ currency, page, pageSize }) =>
        `coin-prices-all?currency=usd&page=${page}&pageSize=${pageSize}`,
      transformResponse: (response: Coin[]) => coinsAdapter.setAll(initialState, response), // transform API response to normalized state
    }),
  }),
});

export const { useGetCoinsQuery } = cryptoApi;

// Selectors
export const selectCoinsResult = cryptoApi.endpoints.getCoins.select({
  currency: 'usd', page: 1, pageSize: 10,
});

const selectCoinsData = createSelector(
  selectCoinsResult,
  (result) => result.data ?? initialState
);

export const {
  selectAll: selectAllCoins,
  selectById: selectCoinById,
  selectIds: selectCoinIds,
} = coinsAdapter.getSelectors(selectCoinsData);
