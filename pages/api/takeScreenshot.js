const playwright = require("playwright-aws-lambda");

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function getBrowserInstance() {
  if (process.env.CHROME_EXECUTABLE_PATH) {
    // running locally
    const { chromium } = require('playwright');
    return await chromium.launch();
  }
  return await playwright.launchChromium();
}

async function insertMorningScreenshot(symbol, buffer) {
  const { data, error } = await supabase
    .from('stock_screenshots_test')
    .update({
      'morning': buffer
    })
    .match({ 'symbol': symbol });
  await supabase
    .from('status_test')
    .update({
      'morning': true
    })
    .match({ 'id': 1 });
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };

};

async function insertAfternoonScreenshot(symbol, buffer) {
  const { data, error } = await supabase
    .from('stock_screenshots_test')
    .update({
      'afternoon': buffer
    })
    .match({ 'symbol': symbol });
  await supabase
    .from('status_test')
    .update({
      'afternoon': true
    })
    .match({ 'id': 1 });
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

async function insertEveningScreenshot(symbol, buffer) {
  const { data, error } = await supabase
    .from('stock_screenshots_test')
    .update({
      'evening': buffer
    })
    .match({ 'symbol': symbol });
  await supabase
    .from('status_test')
    .update({
      'evening': true
    })
    .match({ 'id': 1 });

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

export default async (req, res) => {
  let browser = null;
  let screenshotBuffer;
  try {
    const { time, term } = req.query;

    console.log('start: ', new Date());
    browser = await getBrowserInstance();

    const context = await browser.newContext();
    console.log('browser', new Date());

    const page = await context.newPage();
    console.log('page', new Date());

    await page.setViewportSize({ width: 1280, height: 900 });

    await page.goto(`http://ca.finance.yahoo.com/quote/${term}`);
    await timeout(1000);
    screenshotBuffer = (await page.screenshot()).toString('base64');
    console.log(`✅ ${new Date()} - (${term})`);
    await browser.close();
    console.log('end: ', new Date());

    if (time === 'morning') await insertMorningScreenshot(term, screenshotBuffer);
    else if (time === 'afternoon') await insertAfternoonScreenshot(term, screenshotBuffer);
    else if (time === 'evening') await insertEveningScreenshot(term, screenshotBuffer);
    console.log('successfully inserted screenshot to database');
    return res.send(200);

  } catch (err) {
    console.log(err);
    return res.json({ error: err.message });
  }
};