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
    .select();

  // Did it work?
  console.log(data, error);
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };

};