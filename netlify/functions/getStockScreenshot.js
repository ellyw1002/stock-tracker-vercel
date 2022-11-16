const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {
  const { time, symbol } = event.queryStringParameters;
  let response;

  if (time === 'morning') {
    const { data, error } = await supabase
      .from('stock_screenshots')
      .select('morning')
      .eq('symbol', symbol);
    if (error) {
      console.log('Error in getStockScreenshot: ', error);
      return {
        statusCode: 500
      };
    }
    response = data[0].morning;
  } else if (time === 'afternoon') {
    const { data, error } = await supabase
      .from('stock_screenshots')
      .select('afternoon')
      .eq('symbol', symbol);
    if (error) {
      console.log('Error in getStockScreenshot: ', error);
      return {
        statusCode: 500
      };
    }
    response = data[0].afternoon;
  } else if (time === 'evening') {
    const { data, error } = await supabase
      .from('stock_screenshots')
      .select('evening')
      .eq('symbol', symbol);
    if (error) {
      console.log('Error in getStockScreenshot: ', error);
      return {
        statusCode: 500
      };
    }
    response = data[0].evening;
  }
  // console.log('data:', data);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };

};