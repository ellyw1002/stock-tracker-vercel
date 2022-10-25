import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { removeStockAction } from '../actions/stockList.action.js';
import { selectStockList } from '../selectors/stockList.selector';

export function TableComponent() {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>10:00 AM</th>
          <th>1:00 PM</th>
          <th>5:00 PM</th>
        </tr>
      </thead>
      <tbody>
        {
          stockList.map((stock, index) => (
            <tr key={index}>
              {
                Object.values(stock).map((value, j) =>
                  <td key={j}>{value}</td>
                )
              }
              <td><button onClick={() => dispatch(removeStockAction(index))}>Remove</button></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}