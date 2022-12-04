const yahooFinance = require('yahoo-finance2').default;


exports.handler = async (event, context) => {

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