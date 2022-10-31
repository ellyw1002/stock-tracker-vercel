const initMiddleware = require('../../lib/init-middleware');
const validateMiddleware = require('../../lib/validate-middleware');
const { query, validationResult } = require('express-validator');
const playwright = require("playwright-aws-lambda");
const pages = require('../../test/screenshots.json');

// const validateBody = initMiddleware(
//   validateMiddleware([
//     query('term').trim().escape().toUpperCase()
//   ], validationResult)
// );

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function getBrowserInstance() {
  if (process.env.CHROME_EXECUTABLE_PATH) {
    // running locally
    const { chromium } = require('playwright');
    return await chromium.launch();
  }
  console.log('in prod screenshot');
  return await playwright.launchChromium();
}

exports.handler = async (event, context) => {
  // await validateBody(req, res);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  let browser = null;
  let screenshotBuffer;
  try {
    const { term } = event.queryStringParameters;

    console.log('start: ', new Date());
    browser = await getBrowserInstance();

    const context = await browser.newContext();
    console.log('browser', new Date());

    const page = await context.newPage();
    console.log('page', new Date());

    await page.setViewportSize({ width: 1280, height: 1080 });

    await page.goto(`http://ca.finance.yahoo.com/quote/${term}`);
    await timeout(1000);
    filePath = `screenshots/${(new Date().toJSON().slice(0, 10))}+${term}.png`;
    screenshotBuffer = await page.screenshot({ path: filePath });
    console.log(`✅ ${new Date()} - (${term})`);

    await browser.close();
    console.log('end: ', new Date());
    return {
      statusCode: 200,
      body: JSON.stringify(screenshotBuffer)
    };

  } catch (err) {
    console.log(err);
    return {
      body: err.message || "Something went wrong"
    };
  }
};