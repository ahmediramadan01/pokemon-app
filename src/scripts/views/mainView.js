import View from "./view.js";
import { colors, icons } from "../config.js";

class MainView extends View {
	_parentElement = document.querySelector(".main");
	_data;
	_errorMessage = "Something wrong happened, Please reload the page";

	_generateMarkup() {
		return `
        ${this._data
			.map(
				(pokemon) => `
                <article class="pokemon__card" data-id="${pokemon.id}" style="background:${colors.pokemonTypes[pokemon.types[0].toLowerCase()].background};">
                    <img src="${pokemon.imageUrl}" alt="${pokemon.name}'s image" class="pokemon__image" width="180px" height="180px" />
                    <h2 class="pokemon__name">${pokemon.name}</h2>
                    <p class="pokemon__id">#${pokemon.id}</p>
                    <div class="pokemon__types">
                        ${pokemon.types
							.map(
								(type, i) => `
                            <span class="pokemon__type" style="background:${colors.pokemonTypes[pokemon.types[i].toLowerCase()]?.tag};"><img src="${icons[pokemon.types[i].toLowerCase()]}" alt="${pokemon.types[i]}'s icon"><p>${type}</p></span>
                            `,
							)
							.join("")}
                    </div>
                </article>
                `,
			)
			.join("")}
        `;
	}

	addHandlerMain(handler) {
		window.addEventListener("load", handler);
	}

	addHandlerReload(handler) {
		this._parentElement.addEventListener("click", (event) => {
			const clickedButton = event.target.closest(".error button");
			if (!clickedButton) return;

			handler();
		});
	}
}

export default new MainView();
