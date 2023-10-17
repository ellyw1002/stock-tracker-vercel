import ScreenshotModal from '../components/modal';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveButton from '@mui/icons-material/CancelOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useFetchStockScreenshotQuery, useGetStockDetailsQuery } from '../services/searchApi.js';
import { useRemoveStockMutation } from '../services/stockListApi';

export function Row(props) {
  let screenshotFailed;
  const { stock, status } = props;
  const [modalShow, setModalShow] = React.useState();
  const [screenshotShow, setScreenshotShow] = React.useState({});
  const [detailsShow, setDetailsShow] = React.useState(false);

  const { data: currentScreenshot, isFetching: isScreenshotFetching } = useFetchStockScreenshotQuery(
    screenshotShow, { skip: screenshotShow === {} });
  const { data: stockDetails } = useGetStockDetailsQuery();
  const [removeStock, { isError: isRemoveError }] = useRemoveStockMutation();
  // console.log(stockDetails);
  let morningTableCell, afternoonTableCell, eveningTableCell, nightTableCell;
  screenshotFailed = JSON.parse(localStorage.getItem(`${stock.id}`)) || {
    morning: false,
    afternoon: false,
    evening: false,
    night: false
  };

  if (screenshotFailed.morning) {
    morningTableCell = (<TableCell align="left" key='morning'>
      <ErrorIcon color='error' />
    </TableCell>);
  } else if (status[0].morning) {
    morningTableCell = (<TableCell align="left" key='morning'>
      <a href="#modal" onClick={() => {
        setScreenshotShow({ symbol: stock.symbol, time: 'morning' });
        setModalShow(stock.id);
      }}>
        {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}
      </a>
      <ScreenshotModal open={modalShow === stock.id}
        onClose={() => {
          setModalShow(false);
          setScreenshotShow({});
        }} base64={currentScreenshot} isLoading={isScreenshotFetching}
        fileName={`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`} />
    </TableCell>);
  } else {
    morningTableCell = <TableCell align="left" key='morning'>-</TableCell>;
  }

  if (screenshotFailed.afternoon) {
    afternoonTableCell = (<TableCell align="left" key='afternoon'>
      <ErrorIcon color='error' />
    </TableCell>);
  } else if (status[0].afternoon) {
    afternoonTableCell = (<TableCell align="left" key='afternoon'>
      <a href="#modal" onClick={() => {
        setScreenshotShow({ symbol: stock.symbol, time: 'afternoon' });
        setModalShow(stock.id);
      }}>
        {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`}
      </a>
      <ScreenshotModal open={modalShow === stock.id} onClose={() => {
        setModalShow(false);
        setScreenshotShow({});
      }} base64={currentScreenshot} isLoading={isScreenshotFetching}
        fileName={`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`} />
    </TableCell>);
  } else {
    afternoonTableCell = <TableCell align="left" key='afternoon'>-</TableCell>;
  }

  if (screenshotFailed.evening) {
    eveningTableCell = (<TableCell align="left" key='evening'>
      <ErrorIcon color='error' />
    </TableCell>);
  } else if (status[0].evening) {
    eveningTableCell = (<TableCell align="left" key='evening'>
      <a href="#modal" onClick={() => {
        setScreenshotShow({ symbol: stock.symbol, time: 'evening' });
        setModalShow(stock.id);
      }}>
        {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`}
      </a>
      <ScreenshotModal open={modalShow === stock.id} onClose={() => {
        setModalShow(false);
        setScreenshotShow({});
      }} base64={currentScreenshot} isLoading={isScreenshotFetching}
        fileName={`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`} />
    </TableCell>);
  } else {
    eveningTableCell = <TableCell align="left" key='evening'>-</TableCell>;
  }

  if (screenshotFailed.night) {
    nightTableCell = (<TableCell align="left" key='night'>
      <ErrorIcon color='error' />
    </TableCell>);
  } else if (status[0].night) {
    nightTableCell = (<TableCell align="left" key='evening'>
      <a href="#modal" onClick={() => {
        setScreenshotShow({ symbol: stock.symbol, time: 'night' });
        setModalShow(stock.id);
      }}>
        {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-night.png`}
      </a>
      <ScreenshotModal open={modalShow === stock.id} onClose={() => {
        setModalShow(false);
        setScreenshotShow({});
      }} base64={currentScreenshot} isLoading={isScreenshotFetching}
        fileName={`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-night.png`} />
    </TableCell>);
  } else {
    nightTableCell = <TableCell align="left" key='night'>-</TableCell>;
  }

  return (
    <>
      <TableRow
        key={stock.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row" size="small" onClick={() => setDetailsShow(!detailsShow)}>
            {detailsShow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {stock.symbol}
        </TableCell>
        {morningTableCell}
        {afternoonTableCell}
        {eveningTableCell}
        {nightTableCell}
        <TableCell align="center" key='remove'>
          <IconButton onClick={() => removeStock(stock.id)}>
            <RemoveButton sx={{ fontSize: "0.875rem" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={detailsShow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Summary
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Morning</TableCell>
                    <TableCell align="center">Afternoon</TableCell>
                    <TableCell align="center">Evening</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockDetails && <TableRow key={stock.symbol}>
                    <TableCell component="th" scope="row">
                      Volume
                    </TableCell>
                    <TableCell align='center'>{stockDetails[`${stock.symbol}`]?.morning?.regularMarketVolume}</TableCell>
                    <TableCell align="center">{stockDetails[`${stock.symbol}`]?.afternoon?.regularMarketVolume}</TableCell>
                    <TableCell align="center">{stockDetails[`${stock.symbol}`]?.evening?.regularMarketVolume}</TableCell>
                  </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
