import { api } from "./api";

export const searchApi = api
  .enhanceEndpoints({ addTagTypes: ["Search"] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchStockSymbol: build.query({
        query: (term) => {
          return `/searchStock?term=${term}`;
        },
        transformResponse: (response) => {
          return response.reduce(function (filtered, stock) {
            if (stock.symbol) {
              filtered.push(stock.symbol);
            }
            return filtered;
          }, []);
        }
      }),
      addStock: build.mutation({
        query: (term) => `/insertStock?term=${term}`
      })
    })
  });

export const { useFetchStockSymbolQuery, useAddStockMutation } = searchApi;