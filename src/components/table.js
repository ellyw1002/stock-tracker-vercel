import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ScreenshotModal from '../components/modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStockAction } from '../actions/stockList.action.js';
import { takeScreenshotAction } from '../actions/screenshot.action';
import { selectStockList } from '../selectors/stockList.selector';

export function TableComponent() {
  const [modalShow, setModalShow] = React.useState();
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  const dispatchTakeScreenshot = () => (dispatch(takeScreenshotAction(stockList)));
  function isBase64(str) {
    try {
      window.atob(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  return (
    <Table striped>
      <thead>
        <tr>
          <th>
            Symbol
          </th>
          <th>
            Morning
            <Button variant="outline-light" size="sm" onClick={dispatchTakeScreenshot}>📸</Button>
          </th>
          <th>
            Afternoon
            <Button variant="outline-light" size="sm">📸</Button>
          </th>
          <th>
            Evening
            <Button variant="outline-light" size="sm">📸</Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          stockList.map((stock, index) => (
            <tr key={index}>
              {
                Object.values(stock).map((value, j) => {
                  if (!isBase64(value) || value === stock.symbol) {
                    // console.log('string: ', j);
                    return < td key={j} > {value}</td>;
                  } else {
                    let filename = `${stock.symbol}-${(new Date().toJSON().slice(0, 10))}.png`;
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
              }
              <td><button onClick={() => dispatch(removeStockAction(index))}>Remove</button></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}