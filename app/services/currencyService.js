const API_URL = 'https://api.fixer.io/latest?base=USD';

const currencyService = {

	fetchRates() {
		return fetch(API_URL, {
			method: 'get',
			dataType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((response) => response.json())
		.then((responseData) => {
			// Normalize data
			if (responseData) {
				const rates = responseData.rates;
				const baseName = responseData.base;
				rates[baseName] = 1;
				const rateKeys = Object.keys(rates).sort(); // sort alphabetizes

				return {
					lastUpdated: Date.now(),
					byId: rates,
					allIds: rateKeys
				}
			}
		})
		.catch((err) => {
			console.log('Error fetching rates: ' + err);
			return null;
		});
	}

};

export default currencyService;