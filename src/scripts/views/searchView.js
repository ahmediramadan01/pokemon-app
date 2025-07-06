import View from "./view.js";

class SearchView extends View {
	_parentElement = document.querySelector("#search-form");

	getQuery() {
		return this._parentElement.querySelector("#search").value;
	}

	#clearInputValue() {
		this._parentElement.querySelector("#search").value = "";
	}

	addHandlerSearch(handler) {
		this._parentElement.addEventListener("submit", (event) => {
			event.preventDefault();

			handler();

			this.#clearInputValue();
		});
	}
}

export default new SearchView();
