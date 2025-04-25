// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use the `Post` type we've already defined in `postsSlice`,
// and then re-export it for ease of use


// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coingeko.burjx.com' }),
  endpoints: () => ({}), // no root endpoints — you're injecting them in other slices
});

