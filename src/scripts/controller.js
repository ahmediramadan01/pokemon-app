import "../styles/main.scss";
import * as model from "./model.js";
import mainView from "./views/mainView.js";
import paginationView from "./views/paginationView.js";

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

		paginationView.render(model.state);
	}, 200);
}

function init() {
	mainView.addHandlerMain(controlMain);
	paginationView.addHandlerPagination(controlPagination);
}
init();
