import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useRemoveStockMutation, useResetStockMutation } from '../services/stockListApi';

export function TableButtonRow(props) {
  const { stockList } = props;
  const [removeStock, { isError: removeAllError, isLoading: removeAllLoading }] = useRemoveStockMutation();
  const [resetAllStocks, { isError: resetError, isLoading: resetLoading }] = useResetStockMutation();
  const deleteAllStocks = (stockList) => {
    for (const stock of stockList) {
      removeStock(stock.id);
    }
    window.localStorage.clear();
  };
  return (
    <Stack spacing={1} direction="row" justifyContent="flex-end" paddingBottom={2}>
      {removeAllError && <Alert severity='error'>Failed to delete</Alert>}
      {resetError && <Alert severity='error'>Failed to reset</Alert>}
      <Button size="small" variant="contained" onClick={() => resetAllStocks({ stockList })} disabled={resetLoading || resetError}>
        {resetLoading ?
          <CircularProgress color="inherit" size={20} /> : `Reset`}
      </Button>
      <Button size="small" variant="contained" onClick={() => deleteAllStocks(stockList)} disabled={removeAllLoading || removeAllError}>
        {removeAllLoading ?
          <CircularProgress color="inherit" size={20} /> : `Delete All`}
      </Button>
    </Stack>
  );
}