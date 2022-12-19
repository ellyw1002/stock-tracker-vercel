const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
export default async (req, res) => {
  const { term, isFirst } = req.query;

  const { data, error } = await supabase
    .from('stock_screenshots_green')
    .update({
      'morning': '',
      'afternoon': '',
      'evening': '',
      'night': ''
    })
    .match({ 'id': term });

  if (isFirst === 'true') {
    await supabase
      .from('status_green')
      .update({
        'morning': false,
        'afternoon': false,
        'evening': false,
        'night': false
      })
      .match({ 'id': 1 });
  }

  if (error) {
    console.log('Error in resetStock: ', error);
    return res.send(500);
  }
  return res.send(200);

};