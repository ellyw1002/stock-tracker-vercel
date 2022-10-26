const { chromium } = require("playwright");
import initMiddleware from '../../lib/init-middleware';
import validateMiddleware from '../../lib/validate-middleware';
import { query, validationResult } from 'express-validator';
const pages = require('../../test/screenshots.json');

const validateBody = initMiddleware(
  validateMiddleware([
    query('term').trim().escape().toUpperCase()
  ], validationResult)
);

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default async function handler(req, res) {
  await validateBody(req, res);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { term } = req.query;
    console.log('start: ', new Date());
    let browser = await chromium.launch();
    console.log('browser')
    let page = await browser.newPage();
    console.log('page')
    await page.setViewportSize({ width: 1280, height: 1080 });
    console.log('viewport')
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
    return res.status(200).json('Screenshots taken successfully');

  } catch (err) {
    return res.status(422).json({ serverStatusText: 'fail', serverStatusMessage: err });
  }
}