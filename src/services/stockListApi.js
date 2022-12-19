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
        query: (id) => {
          window.localStorage.removeItem(id);
          return `/removeStock?term=${id}`;
        },
        invalidatesTags: ['StockList'],
      }),
      resetStock: build.mutation({
        async queryFn(accessLevelRequests, _queryApi, _extraOptions, baseQuery) {
          const { stockList } = accessLevelRequests;
          const isFirst = true;
          for (const stock of stockList) {
            const response = await baseQuery({
              url: `resetStock?term=${stock.id}&isFirst=${isFirst}`,
              method: 'GET'
            });
            if (response.error) {
              return { error: 'error' };
            }
            isFirst = false;
            window.localStorage.setItem(`${stock.id}`, JSON.stringify({
              morning: false,
              afternoon: false,
              evening: false
            }));
          }
          return { data: 'success' };
        },
        invalidatesTags: ['StockList'],
      }),
      takeScreenshot: build.mutation({
        async queryFn(accessLevelRequests, _queryApi, _extraOptions, baseQuery) {
          const { stockList, time } = accessLevelRequests;
          for (const stock of stockList) {
            const retries = 3;
            let screenshotState = JSON.parse(window.localStorage.getItem(`${stock.id}`)) || {
              morning: false,
              afternoon: false,
              evening: false
            };
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
            if (retries === 0 && time === 'morning') screenshotState.morning = true;
            if (retries === 0 && time === 'afternoon') screenshotState.afternoon = true;
            if (retries === 0 && time === 'evening') screenshotState.evening = true;

            window.localStorage.setItem(`${stock.id}`, JSON.stringify(screenshotState));
          }
          return { data: 'success' };
        },
        invalidatesTags: ['StockList'],
      }),
      takeScreenshotGoogle: build.mutation({
        async queryFn(accessLevelRequests, _queryApi, _extraOptions, baseQuery) {
          const { stockList } = accessLevelRequests;
          for (const stock of stockList) {
            const retries = 3;
            let screenshotState = JSON.parse(window.localStorage.getItem(`${stock.id}`)) || {
              night: false
            };
            while (retries > 0) {
              console.log('stock: ', stock.symbol);
              console.log('retries: ', retries);
              const response = await baseQuery({
                url: `takeScreenshotGoogle?term=${stock.symbol}`,
                method: 'GET'
              });
              if (!response.error) break;
              retries--;
            }
            if (retries === 0) screenshotState.night = true;

            window.localStorage.setItem(`${stock.id}`, JSON.stringify(screenshotState));
          }
          return { data: 'success' };
        },
        invalidatesTags: ['StockList'],
      }),
    })
  });

export const { useAddStockMutation, useRemoveStockMutation, useTakeScreenshotMutation, useResetStockMutation, useTakeScreenshotGoogleMutation } = stockListApi;