const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {
  const { term, isFirst } = event.queryStringParameters;

  const { data, error } = await supabase
    .from('stock_screenshots')
    .update({
      'morning': '',
      'afternoon': '',
      'evening': '',
    })
    .match({ 'id': term });

  if (isFirst === 'true') {
    await supabase
      .from('status')
      .update({
        'morning': false,
        'afternoon': false,
        'evening': false,
      })
      .match({ 'id': 1 });
  }

  if (error) {
    console.log('Error in resetStock: ', error);
    return {
      statusCode: 500
    };
  }
  return {
    statusCode: 200
  };

};