import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ScreenshotModal from '../components/modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStockAction } from '../actions/stockList.action.js';
import { takeScreenshotAction } from '../actions/screenshot.action';
import { getStockList, getStockScreenshot } from '../api/fetchStock.api';
import {
  selectStockList,
  selectMorningStatus,
  selectAfternoonStatus,
  selectEveningStatus
} from '../selectors/stockList.selector';

const NOT_STARTED_STATE = 'notStarted';
const LOADING_STATE = 'loading';
const DONE_STATE = 'done';
const FAILED_STATE = 'failed';

export function TableComponent() {
  const [modalShow, setModalShow] = React.useState();
  const [stockList, setStockList] = React.useState([]);
  const [currentScreenshot, setCurrentScreenshot] = React.useState('');

  const dispatch = useDispatch();

  const morningState = useSelector(selectMorningStatus);
  const afternoonState = useSelector(selectAfternoonStatus);
  const eveningState = useSelector(selectEveningStatus);

  React.useEffect(() => {
    const getAllData = async () => {
      let response = await getStockList();
      if (!response) return;
      setStockList(response);
    };
    getAllData();
  }, [morningState, afternoonState, eveningState])

  const dispatchMorningScreenshot = () => (dispatch(takeScreenshotAction({ stockList, time: 'morning' })));
  const dispatchAfternoonScreenshot = () => (dispatch(takeScreenshotAction({ stockList, time: 'afternoon' })));
  const dispatchEveningScreenshot = () => (dispatch(takeScreenshotAction({ stockList, time: 'evening' })));
  function isBase64(str) {
    try {
      window.atob(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const onScreenshotClick = async (symbol, time, index) => {
    const buffer = await getStockScreenshot(symbol, time);
    if (!buffer) {
      setCurrentScreenshot('');
      setModalShow(index);
      return;
    }
    setCurrentScreenshot(buffer);
    setModalShow(index);
    // console.log('buffer', currentScreenshot);
  };


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
              onClick={morningState === NOT_STARTED_STATE ? dispatchMorningScreenshot : null}
              disabled={morningState === DONE_STATE}
            >
              {
                morningState === LOADING_STATE ? '🔄' : '📸'
              }
            </Button>
          </th>
          <th>
            Afternoon
            <Button
              variant="outline-light"
              size="sm"
              onClick={afternoonState === NOT_STARTED_STATE ? dispatchAfternoonScreenshot : null}
              disabled={afternoonState === DONE_STATE}
            >
              {
                afternoonState === LOADING_STATE ? '🔄' : '📸'
              }
            </Button>
          </th>
          <th>
            Evening
            <Button
              variant="outline-light"
              size="sm"
              onClick={eveningState === NOT_STARTED_STATE ? dispatchEveningScreenshot : null}
              disabled={eveningState === DONE_STATE}
            >
              {
                eveningState === LOADING_STATE ? '🔄' : '📸'
              }
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          stockList.map((stock, index) => (
            <tr key={index}>
              <td key='stock_symbol'>{stock.symbol}</td>
              <td key='morning'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.symbol, 'morning', index)}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-morning.png`}</a>
                <ScreenshotModal show={modalShow === index} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>
              <td key='afternoon'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.symbol, 'afternoon', index)}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-afternoon.png`}</a>
                <ScreenshotModal show={modalShow === index} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>
              <td key='evening'>
                <a href="#modal" onClick={() => onScreenshotClick(stock.symbol, 'evening', index)}>{`${stock.symbol}-${new Date().toJSON().slice(0, 10)}-evening.png`}</a>
                <ScreenshotModal show={modalShow === index} onHide={() => setModalShow(false)} base64={currentScreenshot} />
              </td>
              {/* {
                Object.values(stock).map((value, j) => {
                  if (j === 1 && morningState === FAILED_STATE) return <td key={j}>Error</td>;
                  else if (j === 2 && afternoonState === FAILED_STATE) return <td key={j}>Error</td>;
                  else if (j === 3 && eveningState === FAILED_STATE) return <td key={j}>Error</td>;
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
              <td><button onClick={() => dispatch(removeStockAction(index))}>Remove</button></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}