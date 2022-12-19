const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
export default async (req, res) => {
  const { term } = req.query;
  const { data, error } = await supabase
    .from('stock_screenshots_green')
    .delete()
    .eq('id', term);

  if (error) {
    console.log('Error in deleteStock: ', error);
    return res.send(500);
  }
  return res.send(200);

};