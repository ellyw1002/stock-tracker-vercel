const yahooFinance = require('yahoo-finance2').default;
// import initMiddleware from '../../lib/init-middleware';
// import validateMiddleware from '../../lib/validate-middleware';
// import { query, validationResult } from 'express-validator';

// const validateBody = initMiddleware(
// 	validateMiddleware([
// 		query('term').trim().escape().toUpperCase()
// 	], validationResult)
// );

exports.handler = async (event, context) => {
	// await validateBody(req, res);
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(422).json({ errors: errors.array() });
	// }

	try {
		const { term } = event.queryStringParameters;
		console.log('query: ', term);

		if (!term) {
			return {
				statusCode: 200,
				body: JSON.stringify([])
			};
		}

		const searchResults = await yahooFinance.search(term, { newsCount: 0 });
		const stockResults = searchResults.quotes;
		// console.log(searchResults.count)
		return {
			statusCode: 200,
			body: JSON.stringify(stockResults)
		};

	} catch (err) {
		return {
			statusCode: 422,
			body: err.message || "Something went wrong"
		};
	}
};