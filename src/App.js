import React from 'react';
import { NavComponent, SearchBar, TableComponent } from './components/index.js';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Grid, Typography } from '@mui/material';
// import '../src/App.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <NavComponent />
      <SearchBar />
      {/* <TableComponent /> */}
    </div>
  );
}

export default App;
