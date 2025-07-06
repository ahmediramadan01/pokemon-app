import View from "./view.js";

class FilterView extends View {
	_parentElement = document.querySelector("#filter");

	addHandlerFilter(handler) {
		this._parentElement.addEventListener("submit", (event) => {
			event.preventDefault();

			const formData = new FormData(event.target);

			const checkedValues = formData.getAll("filter");

			handler(checkedValues);

			this._parentElement.hidePopover();
		});
	}
}

export default new FilterView();
