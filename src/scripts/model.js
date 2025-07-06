/* eslint-disable no-useless-catch */
import { API_URL, RESULTS_PER_PAGE } from "./config.js";

export const state = {
	results: [],
	page: 1,
	pagesCount: 1,
	resultsPerPage: RESULTS_PER_PAGE,
	filters: [],
	filteredResults: [],
};

export async function loadPokemonData(query = "") {
	try {
		state.results = [];
		state.page = 1;
		state.pagesCount = 1;

		const response = await fetch(`${API_URL}/${query}`);
		const data = await response.json();

		if (query) state.results = [data];
		else state.results = data;

		state.pagesCount = Math.ceil(state.results.length / state.resultsPerPage);
	} catch (error) {
		throw error;
	}
}

export function getPokemonData(page = state.page, data = state.results) {
	state.page = page;

	const start = (page - 1) * state.resultsPerPage;
	const end = page * state.resultsPerPage;

	return data.slice(start, end);
}

export function sortPokemonData(criteria) {
	switch (criteria) {
		case "lowest":
			return state.results.sort((a, b) => a.id - b.id);

		case "highest":
			return state.results.sort((a, b) => b.id - a.id);

		case "ascending":
			return state.results.sort((a, b) => a.name[0].localeCompare(b.name[0]));

		case "descending":
			return state.results.sort((a, b) => b.name[0].localeCompare(a.name[0]));
	}
}

export function filterPokemonData(filters) {
	state.page = 1;
	state.pagesCount = 1;

	if (filters.length === 0) {
		state.filteredResults = [...state.results];
	} else {
		state.filters = filters;

		state.filteredResults = state.results.filter((result) =>
			result.types.some((type) => filters.includes(type.toLowerCase())),
		);
	}

	state.pagesCount = Math.ceil(state.filteredResults.length / state.resultsPerPage);
}
