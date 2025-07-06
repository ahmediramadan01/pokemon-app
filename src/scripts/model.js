/* eslint-disable no-useless-catch */
import { API_URL, RESULTS_PER_PAGE } from "./config.js";

export const state = {
	results: [],
	page: 1,
	pagesCount: 1,
	resultsPerPage: RESULTS_PER_PAGE,
};

export async function loadPokemonData() {
	try {
		state.page = 1;

		const response = await fetch(API_URL);
		const data = await response.json();
		state.results = data;

		state.pagesCount = Math.ceil(state.results.length / state.resultsPerPage);
	} catch (error) {
		throw error;
	}
}

export function getPokemonData(page = state.page) {
	state.page = page;

	const start = (page - 1) * state.resultsPerPage;
	const end = page * state.resultsPerPage;

	return state.results.slice(start, end);
}
