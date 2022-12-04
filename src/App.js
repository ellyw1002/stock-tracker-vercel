import React from 'react';
import { NavComponent, SearchBar, TableComponent } from './components/index.js';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Stack spacing={2} direction="column">
        <NavComponent />
        <SearchBar />
        <TableComponent />
      </Stack>
    </div>
  );
}

export default App;
