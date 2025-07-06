import logo from "../../assets/icons/logo.svg";

export default class View {
	#clearParentElement() {
		this._parentElement.innerHTML = "";
	}

	renderLoader() {
		const markup = `
		${[1, 2, 3, 4]
			.map(
				() => `
				<div class="loader__card">
					<div class="loader__image"></div>
					<div class="loader__name"></div>
					<div class="loader__id"></div>
					<div class="loader__types">
						<span class="loader__type"></span> 
						<span class="loader__type"></span>   
					</div>
				</div>
				`,
			)
			.join("")}
        `;

		this.#clearParentElement();

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	renderError(errorMessage = this._errorMessage) {
		const markup = `
        <div class="error">
            <img src=${logo} alt="Logo icon">
            <p>${errorMessage}</p>
			<button class="button button--outline">Reload</button>
        </div>
        `;

		this.#clearParentElement();

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	render(data, render = true) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;

		const markup = this._generateMarkup();

		if (!render) return markup;

		this.#clearParentElement();

		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
