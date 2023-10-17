const yahooFinance = require('yahoo-finance2').default;

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

export default async (req, res) => {

  try {
    const { term, time } = req.query;
    let stockList = JSON.parse(term);
    stockList = stockList.map((stock) => stock.symbol);
    console.log('list: ', stockList[0]);

    if (!stockList || !Array.isArray(stockList) || stockList.length === 0) {
      return res.json([]);
    }

    const map = await yahooFinance.quote(stockList, { return: "map" });
    console.log('InsertStockDetails for stockList:', JSON.stringify(stockList));
    for (const stock of stockList) {
      if (time === 'morning') {
        const { data, error } = await supabase
          .from('stock_details')
          .update({
            'morning': map.get(stock)
          })
          .match({ 'symbol': stock });
        if (error) {
          console.log('Error in getStockDetails morning: ', error);
          return res.send(500);
        }
      } else if (time === 'afternoon') {
        const { data, error } = await supabase
          .from('stock_details')
          .update({
            'afternoon': map.get(stock)
          })
          .match({ 'symbol': stock });
        if (error) {
          console.log('Error in getStockDetails morning: ', error);
          return res.send(500);
        }
      } else if (time === 'evening') {
        const { data, error } = await supabase
          .from('stock_details')
          .update({
            'evening': map.get(stock)
          })
          .match({ 'symbol': stock });
        if (error) {
          console.log('Error in getStockDetails morning: ', error);
          return res.send(500);
        }
      }
    }

    // console.log(map);
    return res.json(map);

  } catch (err) {
    return res.json({ error: err.message || "Something went wrong" });
  }
};