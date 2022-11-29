// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
import ScreenshotModal from '../components/modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStockAction } from '../actions/stockList.action.js';
import { takeScreenshotAction, updatedPageAction } from '../actions/screenshot.action';
import { getStockList, getStockScreenshot } from '../api/fetchStock.api';
import { selectDatabaseUpdated, selectInsertStockSuccess, selectRemoveStockSuccess } from '../selectors/stockList.selector';
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

import { useStockListQuery, useFetchStockScreenshotQuery } from '../services/searchApi.js';
import { useTakeScreenshotMutation } from '../services/stockListApi';

export function TableComponent() {
  let stockList, status;
  const [modalShow, setModalShow] = React.useState();
  const [screenshotShow, setScreenshotShow] = React.useState({});
  // const [currentScreenshot, setCurrentScreenshot] = React.useState('');

  const { data, isError: stockListError, isFetching: isStockListFetching } = useStockListQuery();
  const [takeScreenshot, { data: screenshotFailed, isError, isLoading: isTakingScreenshot }] = useTakeScreenshotMutation();
  const { data: currentScreenshot, isFetching: isScreenshotFetching } = useFetchStockScreenshotQuery(screenshotShow, { skip: screenshotShow === {} });

  if (!isStockListFetching) ({ stockList, status } = data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {!isStockListFetching && (<TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="left">
              Morning&nbsp;
              <IconButton disabled={isTakingScreenshot || status[0].morning} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'morning' })}>
                {(isTakingScreenshot && !status[0].morning) ?
                  <CircularProgress color="inherit" size={20} /> :
                  <PhotoCameraIcon color="inherit" fontSize="20px" />}
              </IconButton>

            </TableCell>
            <TableCell align="left">
              Afternoon&nbsp;
              <IconButton disabled={isTakingScreenshot || status[0].afternoon} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'afternoon' })}>
                {(isTakingScreenshot && !status[0].afternoon && status[0].morning) ?
                  <CircularProgress color="inherit" size={20} /> :
                  <PhotoCameraIcon color="inherit" fontSize="20px" />}
              </IconButton>
            </TableCell>
            <TableCell align="left">
              Evening&nbsp;
              <IconButton disabled={isTakingScreenshot || status[0].evening} size='small' variant='text' onClick={() => takeScreenshot({ stockList, time: 'evening' })}>
                {(isTakingScreenshot && !status[0].evening && status[0].morning && status[0].afternoon) ?
                  <CircularProgress color="inherit" size={20} /> :
                  <PhotoCameraIcon color="inherit" fontSize="20px" />}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>)}
        <TableBody>
          {!isStockListFetching && stockList.map((stock) => {
            const morningTableCell = (status[0].morning)
              ? (<TableCell align="left" key='morning'>
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
                  }} base64={currentScreenshot} isLoading={isScreenshotFetching} />
              </TableCell>)
              : <TableCell align="left" key='morning'>-</TableCell>;
            const afternoonTableCell = (status[0].afternoon)
              ? (<TableCell align="left" key='afternoon'>
                <a href="#modal" onClick={() => {
                  setScreenshotShow({ symbol: stock.symbol, time: 'afternoon' });
                  setModalShow(stock.id);
                }}>
                  {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`}
                </a>
                <ScreenshotModal open={modalShow === stock.id} onClose={() => {
                  setModalShow(false);
                  setScreenshotShow({});
                }} base64={currentScreenshot} isLoading={isScreenshotFetching} />
              </TableCell>)
              : <TableCell align="left" key='afternoon'>-</TableCell>;
            const eveningTableCell = (status[0].evening)
              ? (<TableCell align="left" key='evening'>
                <a href="#modal" onClick={() => {
                  setScreenshotShow({ symbol: stock.symbol, time: 'evening' });
                  setModalShow(stock.id);
                }}>
                  {`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`}
                </a>
                <ScreenshotModal open={modalShow === stock.id} onClose={() => {
                  setModalShow(false);
                  setScreenshotShow({});
                }} base64={currentScreenshot} isLoading={isScreenshotFetching} />
              </TableCell>)
              : <TableCell align="left" key='evening'>-</TableCell>

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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



// export function TableComponent() {
//   const [modalShow, setModalShow] = React.useState();
//   const [stockList, setStockList] = React.useState([]);
//   const [currentScreenshot, setCurrentScreenshot] = React.useState('');

//   const defaultStatus = {
//     NOT_STARTED: true,
//     DONE: false
//   };
//   const [morningStatus, setMorningStatus] = React.useState(defaultStatus);
//   const [afternoonStatus, setAfternoonStatus] = React.useState(defaultStatus);
//   const [eveningStatus, setEveningStatus] = React.useState(defaultStatus);

//   const databaseUpdated = useSelector(selectDatabaseUpdated);
//   const insertSuccess = useSelector(selectInsertStockSuccess);
//   const removeSuccess = useSelector(selectRemoveStockSuccess);

//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     const getAllData = async () => {
//       let response = await getStockList();
//       if (!response) return;
//       response.status.map((statusObject) => {
//         if (statusObject.time === 'morning') setMorningStatus(statusObject);
//         else if (statusObject.time === 'afternoon') setAfternoonStatus(statusObject);
//         else if (statusObject.time === 'evening') setEveningStatus(statusObject);
//       });
//       setStockList(response.stockList);
//       dispatch(updatedPageAction());
//     };
//     getAllData();
//   }, [databaseUpdated])

//   const loadingState = {
//     NOT_STARTED: false,
//     DONE: false
//   };
//   const dispatchMorningScreenshot = () => {
//     dispatch(takeScreenshotAction({ stockList, time: 'morning' }));
//     setMorningStatus(loadingState);
//   };
//   const dispatchAfternoonScreenshot = () => {
//     dispatch(takeScreenshotAction({ stockList, time: 'afternoon' }));
//     setAfternoonStatus(loadingState);
//   };
//   const dispatchEveningScreenshot = () => {
//     dispatch(takeScreenshotAction({ stockList, time: 'evening' }));
//     setEveningStatus(loadingState);
//   };

//   const onScreenshotClick = async (id, symbol, time) => {
//     const buffer = await getStockScreenshot(symbol, time);
//     if (!buffer) {
//       setCurrentScreenshot('');
//       setModalShow(id);
//       return;
//     }
//     setCurrentScreenshot(buffer);
//     setModalShow(id);
//     // console.log('buffer', currentScreenshot);
//   };

//   let isMorningLoading = !morningStatus.NOT_STARTED && !morningStatus.DONE;
//   let isAfternoonLoading = !afternoonStatus.NOT_STARTED && !afternoonStatus.DONE;
//   let isEveningLoading = !eveningStatus.NOT_STARTED && !eveningStatus.DONE;

//   return (
//     <Table striped>
//       <thead>
//         <tr>
//           <th>
//             Symbol
//           </th>
//           <th>
//             Morning
//             <Button
//               variant="outline-light"
//               size="sm"
//               onClick={morningStatus.NOT_STARTED ? dispatchMorningScreenshot : null}
//               disabled={morningStatus.DONE}
//             >
//               {
//                 isMorningLoading ? '🔄' : '📸'
//               }
//             </Button>
//           </th>
//           <th>
//             Afternoon
//             <Button
//               variant="outline-light"
//               size="sm"
//               onClick={afternoonStatus.NOT_STARTED ? dispatchAfternoonScreenshot : null}
//               disabled={afternoonStatus.DONE}
//             >
//               {
//                 isAfternoonLoading ? '🔄' : '📸'
//               }
//             </Button>
//           </th>
//           <th>
//             Evening
//             <Button
//               variant="outline-light"
//               size="sm"
//               onClick={eveningStatus.NOT_STARTED ? dispatchEveningScreenshot : null}
//               disabled={eveningStatus.DONE}
//             >
//               {
//                 isEveningLoading ? '🔄' : '📸'
//               }
//             </Button>
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           stockList.map((stock) => {
//             const morningTableCell = (morningStatus.NOT_STARTED || !morningStatus.DONE)
//               ? <td key='morning'>-</td>
//               : (<td key='morning'>
//                 <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'morning')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
//                 <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
//               </td>);
//             const afternoonTableCell = (afternoonStatus.NOT_STARTED || !afternoonStatus.DONE)
//               ? <td key='afternoon'>-</td>
//               : (<td key='afternoon'>
//                 <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'afternoon')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
//                 <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
//               </td>);
//             const eveningTableCell = (eveningStatus.NOT_STARTED || !eveningStatus.DONE)
//               ? <td key='evening'>-</td>
//               : (<td key='evening'>
//                 <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'evening')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
//                 <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
//               </td>);
//             return (
//               <tr key={stock.id}>
//                 <td key='stock_symbol'>{stock.symbol}</td>
//                 {morningTableCell}
//                 {afternoonTableCell}
//                 {eveningTableCell}
//               {/* {
//                 Object.values(stock).map((value, j) => {
//                   if (j === 1 && morningStatus === FAILED_STATE) return <td key={j}>Error</td>;
//                   else if (j === 2 && afternoonStatus === FAILED_STATE) return <td key={j}>Error</td>;
//                   else if (j === 3 && eveningStatus === FAILED_STATE) return <td key={j}>Error</td>;
//                   else if (!value || !isBase64(value) || value === stock.symbol) {
//                     // console.log('string: ', j);
//                     return < td key={j} > {value}</td>;
//                   } else {
//                     let filename;
//                     if (j === 1) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`;
//                     else if (j === 2) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`;
//                     else if (j === 3) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`;
//                     // console.log(imgSource);
//                     // return <td key={j}><img src={imgSource} width="150" height="100" /></td>;
//                     return (
//                       <td key={j}>
//                         <a href="#modal" onClick={() => setModalShow(index)}>{filename}</a>
//                         <ScreenshotModal show={modalShow === index} onHide={() => setModalShow(false)} base64={value} />
//                       </td>
//                     )
//                   }
//                 })
//               } */}
//                 <td><button onClick={() => dispatch(removeStockAction(stock.id))}>Remove</button></td>
//             </tr>
//             );
//           })
//         }
//       </tbody>
//     </Table>
//   );
// }