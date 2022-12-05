const yahooFinance = require('yahoo-finance2').default;


export default async (req, res) => {

	try {
		const { term } = req.query;
		console.log('query: ', term);

		if (!term) {
			return res.json([]);
		}

		const searchResults = await yahooFinance.search(term, { newsCount: 0 });
		const stockResults = searchResults.quotes;
		// console.log(searchResults.count)
		return res.json(stockResults);

	} catch (err) {
		return res.json({ error: err.message || "Something went wrong" });
	}
};