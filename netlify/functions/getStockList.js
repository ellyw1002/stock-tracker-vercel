const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {
  const { data, error } = await supabase
    .from('stock_screenshots')
    .select('symbol');
  if (error) {
    console.log('Error in getStockScreenshot: ', error);
    return {
      statusCode: 500
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };

};