import "../styles/main.scss";
import * as model from "./model.js";
import mainView from "./views/mainView.js";

async function controlMain() {
	try {
		mainView.renderLoader();

		await model.getPokemonData();

		mainView.render(model.state.results);
	} catch (error) {
		console.error(error.message);
		mainView.renderError(error.message);
	}
}

function init() {
	mainView.addHandlerMain(controlMain);
}
init();
