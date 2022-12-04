import ScreenshotModal from '../components/modal';
import React from 'react';
import { TableButtonRow } from './tableButtonRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveButton from '@mui/icons-material/CancelOutlined';
import Alert from '@mui/material/Alert';
import ErrorIcon from '@mui/icons-material/Error';

import { useStockListQuery, useFetchStockScreenshotQuery } from '../services/searchApi.js';
import { useTakeScreenshotMutation, useRemoveStockMutation } from '../services/stockListApi';

export function TableComponent() {
  let stockList, status, screenshotFailed;
  const [modalShow, setModalShow] = React.useState();
  const [screenshotShow, setScreenshotShow] = React.useState({});
  // const [currentScreenshot, setCurrentScreenshot] = React.useState('');

  const { data, isError: stockListError, isFetching: isStockListFetching } = useStockListQuery();
  let [
    takeScreenshot,
    { isError: screenshotError, isLoading: isTakingScreenshot }
  ] = useTakeScreenshotMutation();
  const { data: currentScreenshot, isFetching: isScreenshotFetching } = useFetchStockScreenshotQuery(
    screenshotShow, { skip: screenshotShow === {} });
  const [removeStock, { isError: isRemoveError }] = useRemoveStockMutation();

  if (!isStockListFetching) ({ stockList, status } = data);
  return (
    <>
      {stockListError && <Alert severity="error">Failed to get stock list</Alert>}
      {screenshotError && <Alert severity="error">Failed to take screenshot</Alert>}
      {isRemoveError && <Alert severity="error">Failed to remove stock</Alert>}
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="left">
                Morning&nbsp;
                <IconButton disabled={isTakingScreenshot || !status || status[0].morning} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'morning' })}>
                  {(isTakingScreenshot && !status[0].morning) ?
                    <CircularProgress color="inherit" size={20} /> :
                    <PhotoCameraIcon color="inherit" fontSize="20px" />}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                Afternoon&nbsp;
                <IconButton disabled={isTakingScreenshot || !status || status[0]?.afternoon} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'afternoon' })}>
                  {(isTakingScreenshot && !status[0].afternoon && status[0].morning) ?
                    <CircularProgress color="inherit" size={20} /> :
                    <PhotoCameraIcon color="inherit" fontSize="20px" />}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                Evening&nbsp;
                <IconButton disabled={isTakingScreenshot || !status || status[0]?.evening} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'evening' })}>
                  {(isTakingScreenshot && !status[0].evening && status[0].morning && status[0].afternoon) ?
                    <CircularProgress color="inherit" size={20} /> :
                    <PhotoCameraIcon color="inherit" fontSize="20px" />}
                </IconButton>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isStockListFetching && stockList.map((stock) => {
              let morningTableCell, afternoonTableCell, eveningTableCell;
              screenshotFailed = JSON.parse(localStorage.getItem(`${stock.id}`)) || {
                morning: false,
                afternoon: false,
                evening: false
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
                </TableCell>)
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
                </TableCell>)
              } else {
                eveningTableCell = <TableCell align="left" key='evening'>-</TableCell>;
              }

              return (
                <TableRow
                  key={stock.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {stock.symbol}
                  </TableCell>
                  {morningTableCell}
                  {afternoonTableCell}
                  {eveningTableCell}
                  <TableCell align="center" key='remove'>
                    <IconButton onClick={() => removeStock(stock.id)}>
                      <RemoveButton sx={{ fontSize: "0.875rem" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!isStockListFetching && <TableButtonRow stockList={stockList}></TableButtonRow>}
    </>
  );
}
