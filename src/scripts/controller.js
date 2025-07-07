import "../styles/main.scss";
import * as model from "./model.js";
import mainView from "./views/mainView.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView.js";
import sortView from "./views/sortView.js";
import filterView from "./views/filterView.js";
import pokemonView from "./views/pokemonView.js";

async function controlMain() {
	try {
		mainView.renderLoader();

		await model.loadPokemonData();

		mainView.render(model.getPokemonData());

		paginationView.render(model.state);
	} catch (error) {
		console.error(error);
		mainView.renderError(error.message);
	}
}

function controlPagination(newPage) {
	setTimeout(() => {
		mainView.render(model.getPokemonData(newPage));

		window.scrollTo({ top: 0, behavior: "smooth" });

		paginationView.render(model.state);
	}, 200);
}

async function controlSearchResults() {
	try {
		const query = searchView.getQuery();
		if (!query) return;

		mainView.renderLoader();

		await model.loadPokemonData(query);

		mainView.render(model.getPokemonData());

		paginationView.render(model.state);
	} catch (error) {
		paginationView.render(model.state);
		console.error(error);
		mainView.renderError("No pokémon matched your search!");
	}
}

function controlReload() {
	window.location.reload();
}

function controlSort(criteria) {
	mainView.renderLoader();

	model.sortPokemonData(criteria);

	mainView.render(model.getPokemonData(1));

	paginationView.render(model.state);
}

function controlFilter(filters) {
	model.filterPokemonData(filters);

	mainView.renderLoader();

	mainView.render(model.getPokemonData(1, model.state.filteredResults));

	paginationView.render(model.state);
}

async function controlDetails(id) {
	try {
		await model.loadPokemonDetails(id);

		pokemonView.render(model.state.pokemonDetails);
	} catch (error) {
		console.error(error);
		pokemonView.renderError(error.message);
	}
}

function init() {
	mainView.addHandlerMain(controlMain);
	paginationView.addHandlerPagination(controlPagination);
	searchView.addHandlerSearch(controlSearchResults);
	mainView.addHandlerReload(controlReload);
	sortView.addHandlerSort(controlSort);
	filterView.addHandlerFilter(controlFilter);
	mainView.addHandlerDetails(controlDetails);
	pokemonView.addHandlerInfo();
}
init();
