import View from "./view.js";

class sortView extends View {
	_parentElement = document.querySelector("#sort");

	addHandlerSort(handler) {
		this._parentElement.addEventListener("change", (event) => {
			handler(event.target.value);
		});
	}
}

export default new sortView();
