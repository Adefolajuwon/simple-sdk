const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');

class DevTo {
	constructor(config) {
		this.api_key = config.api_key;
		this.basePath = 'https://dev.to/api';
		this.headers = {
			api_key: this.api_key,
			'Content-type': 'application/json',
		};
	}

	async request(endpoint = '', options = {}) {
		const url = this.basePath + endpoint;
		const config = {
			...options,
			headers: {
				...this.headers,
				...options.headers,
			},
		};

		const response = await fetch(url, config);
		if (!response.ok) {
			throw new Error('Request failed: ' + response.statusText);
		}

		return await response.json();
	}

	async getArticleById(id) {
		const url = '/articles/' + id;
		return await this.request(url);
	}

	async getArticles(options) {
		const qs = options ? '?' + querystring.stringify(options) : '';
		const url = '/articles' + qs;
		const config = {
			method: 'GET',
		};
		return await this.request(url, config);
	}
}
