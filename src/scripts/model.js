/* eslint-disable no-useless-catch */
import { API_URL } from "./config.js";

export const state = {
	results: [],
};

export async function getPokemonData() {
	try {
		const response = await fetch(API_URL);
		const data = await response.json();

		state.results = data;
	} catch (error) {
		throw error;
	}
}
