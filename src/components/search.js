import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useFetchStockSymbolQuery, useAddStockMutation } from '../services/searchApi.js';

export function SearchBar() {
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const { data: options, isError, isFetching } = useFetchStockSymbolQuery(inputValue);
  const [addStock, { isFetching: isAddStockFetching, isError: isAddStockError }] = useAddStockMutation();


  return (
    <Stack spacing={2} direction="row" sx={{ paddingTop: 2 }}>
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
            label="Search Stock"
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
      <Button variant="outlined" sx={{ width: "100px" }}
        onClick={() => {
          if (value) addStock(value);
        }}>
        Add
      </Button>
    </Stack>

  );
}

