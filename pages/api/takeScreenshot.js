const chromium = require('chrome-aws-lambda');

const handler = async (req, res) => {

  // const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

  // if (!pageToScreenshot) return {
  //   statusCode: 400,
  //   body: JSON.stringify({ message: 'Page URL not defined' })
  // };

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--disable-features=AudioServiceOutOfProcess',
      '--disable-gpu',
      '--disable-software-rasterize'
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.goto('https://ca.finance.yahoo.com/quote/TSLA', { waitUntil: 'networkidle2' });

  const screenshot = await page.screenshot({ encoding: 'binary', path: `screenshots/test${1}.jpeg` });

  await browser.close();

  res.send({
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot`
    })
  })

};

export default handler;
// const chromium = require('chrome-aws-lambda');
// const puppeteer = require('puppeteer-core');
// import initMiddleware from '../../lib/init-middleware';
// import validateMiddleware from '../../lib/validate-middleware';
// import { query, validationResult } from 'express-validator';
// const pages = require('../../test/screenshots.json');

// const validateBody = initMiddleware(
//   validateMiddleware([
//     query('term').trim().escape().toUpperCase()
//   ], validationResult)
// );

// const timeout = (ms) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

// async function getBrowserInstance() {
//   const executablePath = await chromium.executablePath;

//   if (!executablePath) {
//     // running locally
//     return puppeteer.launch({
//       args: chromium.args,
//       headless: true,
//       defaultViewport: {
//         width: 1280,
//         height: 800
//       },
//       ignoreHTTPSErrors: true
//     });
//   }
//   console.log('in prod screenshot');
//   return chromium.puppeteer.launch({
//     args: chromium.args,
//     defaultViewport: {
//       width: 1280,
//       height: 1080
//     },
//     executablePath,
//     headless: chromium.headless,
//     ignoreHTTPSErrors: true,
//     ignoreDefaultArgs: ['--disable-extensions']
//   });
// }

// export default async function handler(req, res) {
//   await validateBody(req, res);
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }
//   let browser = null;
//   try {
//     const { term } = req.query;
//     console.log('start: ', new Date());
//     browser = await getBrowserInstance();
//     console.log('browser', new Date());
//     let page = await browser.newPage();
//     console.log('page', new Date());
//     for (const { id, url } of pages) {
//       await page.goto(url);
//       await timeout(1000);
//       await page.screenshot({ path: `screenshots/test${id}.jpeg` });
//       console.log(`✅ ${new Date()} - (${url})`);
//       if (id == 1) break;
//     }
//     // await page.goto(`http://ca.finance.yahoo.com/quote/${term}`);
//     // await page.screenshot({ path: `test.jpeg` });
//     await browser.close();
//     console.log('end: ', new Date());
//     return res.status(200).json('Screenshots taken successfully');

//   } catch (err) {
//     console.log(err);
//     res.json({
//       status: 'error',
//       data: err.message || 'Something went wrong'
//     })
//   }
// }