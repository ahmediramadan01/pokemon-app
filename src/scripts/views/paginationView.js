import View from "./view.js";

class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");

	_generateMarkup() {
		const { page, pagesCount } = this._data;

		if (page === 1 && pagesCount <= 1) {
			return "";
		} else if (page === 1 && pagesCount > 1) {
			return this.#generatePreviousButtonMarkup(true) + this.#generateNextButtonMarkup();
		} else if (page === pagesCount && pagesCount > 1) {
			return this.#generatePreviousButtonMarkup() + this.#generateNextButtonMarkup(true);
		} else if (page > 1 && pagesCount > 1) {
			return this.#generatePreviousButtonMarkup() + this.#generateNextButtonMarkup();
		}
	}

	#generatePreviousButtonMarkup(disabled = false) {
		return `
        <button class="button button--${disabled ? "outline" : "primary"} pagination__button pagination__button--previous" ${disabled ? "disabled" : ""}>
            <span>Previous</span>
        </button>
    `;
	}

	#generateNextButtonMarkup(disabled = false) {
		return `
        <button class="button button--${disabled ? "outline" : "primary"} pagination__button pagination__button--next" ${disabled ? "disabled" : ""}>
            <span>Next</span>
        </button>
        `;
	}

	addHandlerPagination(handler) {
		this._parentElement.addEventListener("click", (event) => {
			const clickedButton = event.target.closest(".pagination__button");
			if (!clickedButton) return;

			clickedButton.classList.contains("pagination__button--previous")
				? handler(this._data.page - 1)
				: handler(this._data.page + 1);
		});
	}
}

export default new PaginationView();
