import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStockAction } from '../actions/stockList.action.js';
import { searchStock } from '../api/fetchStock.api.js';

import Select from 'react-select';
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export function SearchBar() {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  function onInputChange(query) {
    getOptionsAsync(query);
  }

  function getOptionsAsync(query) {
    setSelectedOption('');
    searchStock(query).then((results) => {
      const formattedResults = results.reduce(function (filtered, stock) {
        if (stock.symbol) {
          filtered.push({ label: stock.symbol, value: stock.symbol });
        }
        return filtered;
      }, []);
      setOptions(formattedResults);
    }).catch((error) => {
      console.error(error);
    });
  }
  return (
    <div className="App">
      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center"></div>
        <Select className="mb-3"
          onInputChange={(value) => onInputChange(value)}
          options={options || []}
          onChange={(value) => setSelectedOption(value)}
          closeMenuOnSelect={true}
          openMenuOnClick={false}
          isClearable={true}
          components={{
            DropdownIndicator: () => selectedOption ?
              <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(addStockAction(selectedOption.value))}>
                Add
              </Button> :
              <Button variant="outline-secondary" id="button-addon2" disabled>
                Add
              </Button>
            ,
            IndicatorSeparator: () => null,
          }}

        />
      </div>
    </div>
  );
}

