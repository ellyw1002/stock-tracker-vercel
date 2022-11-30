import { removeStock } from "../api/stockList.api";
import { api } from "./api";

export const stockListApi = api
  .enhanceEndpoints({ addTagTypes: ['StockList'] })
  .injectEndpoints({
    endpoints: (build) => ({
      addStock: build.mutation({
        query: (term) => `/insertStock?term=${term}`,
        invalidatesTags: ['StockList'],
      }),
      removeStock: build.mutation({
        query: (id) => `/removeStock?term=${id}`,
        invalidatesTags: ['StockList'],
      }),
      takeScreenshot: build.mutation({
        async queryFn(accessLevelRequests, _queryApi, _extraOptions, baseQuery) {
          let screenshotFailed = [];
          const { stockList, time } = accessLevelRequests;
          for (const stock of stockList) {
            const retries = 3;
            while (retries > 0) {
              console.log('stock: ', stock.symbol);
              console.log('retries: ', retries);
              const response = await baseQuery({
                url: `takeScreenshot?term=${stock.symbol}&time=${time}`,
                method: 'GET'
              });
              if (!response.error) break;
              retries--;
            }
            if (retries === 0) screenshotFailed[stock.id] = true;
            else screenshotFailed[stock.id] = false;
          }
          console.log(screenshotFailed);
          return { data: screenshotFailed };
        },
        invalidatesTags: ['StockList'],
      }),
    })
  });

export const { useAddStockMutation, useRemoveStockMutation, useTakeScreenshotMutation } = stockListApi;