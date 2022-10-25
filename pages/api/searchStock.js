const yahooFinance = require('yahoo-finance2').default;
import initMiddleware from '../../lib/init-middleware';
import validateMiddleware from '../../lib/validate-middleware';
import { query, validationResult } from 'express-validator';

const validateBody = initMiddleware(
	validateMiddleware([
		query('term').trim().escape().toUpperCase()
	], validationResult)
);

export default async function handler(req, res) {
	await validateBody(req, res);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	try {
		const { term } = req.query;
		// console.log('query: ', term);

		const searchResults = await yahooFinance.search(term, { newsCount: 0 });
		const stockResults = searchResults.quotes;
		// console.log(searchResults.count)
		return res.json(stockResults);

	} catch (err) {
		return res.status(422).json({ serverStatusText: 'fail', serverStatusMessage: err });
	}
};