import { api } from "./api";

export const searchApi = api
  .enhanceEndpoints({ addTagTypes: ['StockList'] })
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
      stockList: build.query({
        query: () => `/getStockList`,
        providesTags: ['StockList'],
        transformResponse: async (response) => JSON.parse(response.body),
      }),
      fetchStockScreenshot: build.query({
        query: ({ symbol, time }) => {
          return `/getStockScreenshot?symbol=${symbol}&time=${time}`;
        },
        transformResponse: async (response) => {
          if (response.body) return JSON.parse(response.body);
        },
      }),
    })
  });

export const { useFetchStockSymbolQuery, useStockListQuery, useFetchStockScreenshotQuery } = searchApi;