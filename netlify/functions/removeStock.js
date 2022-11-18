const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {
  const { term } = event.queryStringParameters;
  const { data, error } = await supabase
    .from('stock_screenshots')
    .delete()
    .eq('id', term);

  if (error) {
    console.log('Error in deleteStock: ', error);
    return {
      statusCode: 500
    };
  }
  return {
    statusCode: 200
  };

};