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

async function insertNightScreenshot(symbol, buffer) {
  const { data, error } = await supabase
    .from('stock_screenshots_green')
    .update({
      'night': buffer
    })
    .match({ 'symbol': symbol });
  await supabase
    .from('status_green')
    .update({
      'night': true
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
    const { term } = req.query;

    console.log('start: ', new Date());
    browser = await getBrowserInstance();

    const context = await browser.newContext();
    console.log('browser', new Date());

    const page = await context.newPage();
    console.log('page', new Date());

    await page.setViewportSize({ width: 1280, height: 900 });

    await page.goto(`https://www.google.com/search?q=${term}`);
    await timeout(1000);
    screenshotBuffer = (await page.screenshot()).toString('base64');
    console.log(`✅ ${new Date()} - (${term})`);
    await browser.close();
    console.log('end: ', new Date());

    insertNightScreenshot(term, screenshotBuffer);
    console.log('successfully inserted screenshot to database');

    return res.send(200);

  } catch (err) {
    console.log(err);
    return res.json({ error: err.message });
  }
};