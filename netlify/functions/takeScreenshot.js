const chromium = require('chrome-aws-lambda');
// const initMiddleware = require('../../lib/init-middleware');
// const validateMiddleware = require('../../lib/validate-middleware');
// import { query, validationResult } from 'express-validator';
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
  const executablePath = await chromium.executablePath;
  console.log(executablePath);
  if (!executablePath) {
    // running locally
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 800
      },
      ignoreHTTPSErrors: true
    });
  }
  console.log('in prod screenshot');
  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 1080
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--disable-extensions']
  });
}

// async function getBrowserInstance() {
//   const executablePath = await chromium.executablePath;
//   console.log(executablePath);
//   const puppeteer = require("puppeteer");
//   return puppeteer.launch({
//     args: chromium.args,
//     headless: true,
//     defaultViewport: {
//       width: 1280,
//       height: 720,
//     },
//     ignoreHTTPSErrors: true,
//   });
// }

exports.handler = async (event, context) => {
  // await validateBody(req, res);
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }
  let browser = null;
  try {
    const { term } = event.queryStringParameters;
    console.log('start: ', new Date());
    browser = await getBrowserInstance();
    console.log('browser', new Date());
    let page = await browser.newPage();
    console.log('page', new Date());
    for (const { id, url } of pages) {
      await page.goto(url);
      await timeout(1000);
      await page.screenshot({ path: `screenshots/test${id}.jpeg` });
      console.log(`✅ ${new Date()} - (${url})`);
      if (id == 1) break;
    }
    // await page.goto(`http://ca.finance.yahoo.com/quote/${term}`);
    // await page.screenshot({ path: `test.jpeg` });
    await browser.close();
    console.log('end: ', new Date());
    return {
      statusCode: 200,
      body: "Screenshot taken successfully"
    };

  } catch (err) {
    console.log(err);
    return {
      status: 'error',
      body: err.message || "Something went wrong"
    };
  }
};