import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRemoveStockMutation } from '../services/stockListApi';

export function TableButtonRow(props) {
  const { stockList } = props;
  let [removeStock, { isError: removeAllError, isLoading: removeAllLoading }] = useRemoveStockMutation();

  const deleteAllStocks = (stockList) => {
    for (const stock of Array.from(stockList)) {
      removeStock(stock.id);
    }
  };
  return (
    <Stack spacing={1} direction="row" justifyContent="flex-end" >
      <Button size="small" variant="contained" >
        Reset
      </Button>
      <Button size="small" variant="contained" onClick={() => deleteAllStocks(stockList)}>
        Delete All
      </Button>
    </Stack>
  );
}