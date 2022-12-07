const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
export default async (req, res) => {
  const { data, error } = await supabase
    .from('stock_screenshots_green')
    .select('id, symbol');

  const status = await supabase
    .from('status')
    .select();

  if (error) {
    console.log('Error in getStockScreenshot: ', error);
    return res.send(500);
  }
  const response = {
    stockList: data,
    status: status.data
  };

  return res.json({
    statusCode: 200,
    body: JSON.stringify(response)
  });
};
