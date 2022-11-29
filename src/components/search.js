import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useFetchStockSymbolQuery } from '../services/searchApi.js';
import { useAddStockMutation } from '../services/stockListApi.js';

export function SearchBar() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const { data: options, isError, isFetching } = useFetchStockSymbolQuery(inputValue, { skip: inputValue === '' });
  const [addStock, { isLoading: isAddStockFetching, isError: isAddStockError }] = useAddStockMutation();

  return (
    <Stack spacing={2} direction="column">
      <Stack spacing={2} direction="row">
        <Autocomplete
          id="search-bar"
          autoComplete
          fullWidth={true}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          filterOptions={(x) => x}
          options={options ? options : []}
          value={value}
          loading={isFetching}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderOption={(props, option) => <li {...props} > {option}</ li>}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search stock"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Button variant="outlined" sx={{ width: "100px" }} disabled={isAddStockFetching}
          onClick={() => {
            if (value) addStock(value);
          }}>
          {!isAddStockFetching && 'Add'}
          {isAddStockFetching &&
            <CircularProgress color="inherit" size={20} />}
        </Button>
      </Stack>
      {isError && <Alert severity="error">Failed to fetch stock. Try again later.</Alert>}
      {isAddStockError && <Alert severity="error">Failed to add stock. Try again later.</Alert>}
    </Stack>
  );
}

