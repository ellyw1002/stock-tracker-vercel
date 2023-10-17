const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
export default async (req, res) => {
  let results = {};
  // const { symbol } = req.query;
  let { data, error } = await supabase
    .from('stock_details')
    .select('symbol, morning, afternoon, evening');

  data.map((stock) => {
    results[`${stock.symbol}`] = stock;
  });

  if (error) {
    console.log('Error in getStockDetails: ', error);
    return res.send(500);
  }
  return res.json({
    statusCode: 200,
    body: JSON.stringify(results)
  });
};
