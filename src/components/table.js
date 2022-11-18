import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ScreenshotModal from '../components/modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStockAction } from '../actions/stockList.action.js';
import { takeScreenshotAction, updatedPageAction } from '../actions/screenshot.action';
import { getStockList, getStockScreenshot } from '../api/fetchStock.api';
import { selectDatabaseUpdated, selectInsertStockSuccess, selectRemoveStockSuccess } from '../selectors/stockList.selector';

export function TableComponent() {
  const [modalShow, setModalShow] = React.useState();
  const [stockList, setStockList] = React.useState([]);
  const [currentScreenshot, setCurrentScreenshot] = React.useState('');

  const defaultStatus = {
    NOT_STARTED: true,
    DONE: false
  };
  const [morningStatus, setMorningStatus] = React.useState(defaultStatus);
  const [afternoonStatus, setAfternoonStatus] = React.useState(defaultStatus);
  const [eveningStatus, setEveningStatus] = React.useState(defaultStatus);

  const databaseUpdated = useSelector(selectDatabaseUpdated);
  const insertSuccess = useSelector(selectInsertStockSuccess);
  const removeSuccess = useSelector(selectRemoveStockSuccess);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const getAllData = async () => {
      let response = await getStockList();
      if (!response) return;
      response.status.map((statusObject) => {
        if (statusObject.time === 'morning') setMorningStatus(statusObject);
        else if (statusObject.time === 'afternoon') setAfternoonStatus(statusObject);
        else if (statusObject.time === 'evening') setEveningStatus(statusObject);
      });
      setStockList(response.stockList);
      dispatch(updatedPageAction());
    };
    getAllData();
  }, [databaseUpdated])

  const loadingState = {
    NOT_STARTED: false,
    DONE: false
  };
  const dispatchMorningScreenshot = () => {
    dispatch(takeScreenshotAction({ stockList, time: 'morning' }));
    setMorningStatus(loadingState);
  };
  const dispatchAfternoonScreenshot = () => {
    dispatch(takeScreenshotAction({ stockList, time: 'afternoon' }));
    setAfternoonStatus(loadingState);
  };
  const dispatchEveningScreenshot = () => {
    dispatch(takeScreenshotAction({ stockList, time: 'evening' }));
    setEveningStatus(loadingState);
  };

  const onScreenshotClick = async (id, symbol, time) => {
    const buffer = await getStockScreenshot(symbol, time);
    if (!buffer) {
      setCurrentScreenshot('');
      setModalShow(id);
      return;
    }
    setCurrentScreenshot(buffer);
    setModalShow(id);
    // console.log('buffer', currentScreenshot);
  };

  let isMorningLoading = !morningStatus.NOT_STARTED && !morningStatus.DONE;
  let isAfternoonLoading = !afternoonStatus.NOT_STARTED && !afternoonStatus.DONE;
  let isEveningLoading = !eveningStatus.NOT_STARTED && !eveningStatus.DONE;

  return (
    <Table striped>
      <thead>
        <tr>
          <th>
            Symbol
          </th>
          <th>
            Morning
            <Button
              variant="outline-light"
              size="sm"
              onClick={morningStatus.NOT_STARTED ? dispatchMorningScreenshot : null}
              disabled={morningStatus.DONE}
            >
              {
                isMorningLoading ? '🔄' : '📸'
              }
            </Button>
          </th>
          <th>
            Afternoon
            <Button
              variant="outline-light"
              size="sm"
              onClick={afternoonStatus.NOT_STARTED ? dispatchAfternoonScreenshot : null}
              disabled={afternoonStatus.DONE}
            >
              {
                isAfternoonLoading ? '🔄' : '📸'
              }
            </Button>
          </th>
          <th>
            Evening
            <Button
              variant="outline-light"
              size="sm"
              onClick={eveningStatus.NOT_STARTED ? dispatchEveningScreenshot : null}
              disabled={eveningStatus.DONE}
            >
              {
                isEveningLoading ? '🔄' : '📸'
              }
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          stockList.map((stock) => {
            const morningTableCell = (morningStatus.NOT_STARTED || !morningStatus.DONE)
              ? <td key='morning'>-</td>
              : (<td key='morning'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'morning')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
                <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>);
            const afternoonTableCell = (afternoonStatus.NOT_STARTED || !afternoonStatus.DONE)
              ? <td key='afternoon'>-</td>
              : (<td key='afternoon'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'afternoon')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
                <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>);
            const eveningTableCell = (eveningStatus.NOT_STARTED || !eveningStatus.DONE)
              ? <td key='evening'>-</td>
              : (<td key='evening'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.id, stock.symbol, 'evening')}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
                <ScreenshotModal show={modalShow === stock.id} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>);
            return (
              <tr key={stock.id}>
                <td key='stock_symbol'>{stock.symbol}</td>
                {morningTableCell}
                {afternoonTableCell}
                {eveningTableCell}
              {/* {
                Object.values(stock).map((value, j) => {
                  if (j === 1 && morningStatus === FAILED_STATE) return <td key={j}>Error</td>;
                  else if (j === 2 && afternoonStatus === FAILED_STATE) return <td key={j}>Error</td>;
                  else if (j === 3 && eveningStatus === FAILED_STATE) return <td key={j}>Error</td>;
                  else if (!value || !isBase64(value) || value === stock.symbol) {
                    // console.log('string: ', j);
                    return < td key={j} > {value}</td>;
                  } else {
                    let filename;
                    if (j === 1) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`;
                    else if (j === 2) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`;
                    else if (j === 3) filename = `${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`;
                    // console.log(imgSource);
                    // return <td key={j}><img src={imgSource} width="150" height="100" /></td>;
                    return (
                      <td key={j}>
                        <a href="#modal" onClick={() => setModalShow(index)}>{filename}</a>
                        <ScreenshotModal show={modalShow === index} onHide={() => setModalShow(false)} base64={value} />
                      </td>
                    )
                  }
                })
              } */}
                <td><button onClick={() => dispatch(removeStockAction(stock.id))}>Remove</button></td>
            </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
}