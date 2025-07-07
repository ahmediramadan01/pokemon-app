import View from "./view.js";
import { colors, icons } from "../config.js";

class PokemonView extends View {
	_parentElement = document.querySelector("#details");
	_data;

	_generateMarkup() {
		return `
        <header class="details__header" style="background:${colors.pokemonTypes[this._data.types[0].toLowerCase()].background};">
            <button popovertarget="details" popovertargetaction="hide" class="button details__button">
                <img src="${icons.arrowBack}" alt="Arrow back icon" />
            </button>
            <div class="details__card">
                <picture class="details__picture">
                    <img src="${this._data.imageUrl}" alt="${this._data.names}'s image" />
                </picture>
                <div class="details__info">
                    <p class="details__id">#${this._data.id}</p>
                    <h2 class="details__name">${this._data.name}</h2>
                    <div class="details__types">
                        ${this._data.types
							.map(
								(type, i) => `
                            <span class="details__type" style="background:${colors.pokemonTypes[this._data.types[i].toLowerCase()]?.tag};"><img src="${icons[this._data.types[i].toLowerCase()]}" alt="${this._data.types[i]}'s icon"><p>${type}</p></span>
                            `,
							)
							.join("")}
                    </div>
                </div>
            </div>
        </header>
        <div class="details__info">
            <nav class="details__nav">
                <ul class="details__list">
                    <li class="details__item details__item--active"><a href="#">About</a></li>
                    <li class="details__item"><a href="#">Base stats</a></li>
                </ul>
            </nav>
            <div class="details__pokemon details__about">
                <dl>
                ${
					this._data.genus &&
					`
                    <div>
                        <dt>Genus</dt>
                        <dd>${this._data.genus}</dd>
                    </div>
                    `
				}
                    ${
						this._data.description &&
						`
                    <div>
                        <dt>Description</dt>
                        <dd>${this._data.description}</dd>
                    </div>
                    `
					}
                    ${
						this._data.abilities.length !== 0
							? `
                    <div>
                        <dt>Abilities</dt>
                        <dd>${this._data.abilities.map((ability) => ability.name).join(", ")}</dd>
                    </div>
                    `
							: ""
					}
                    ${
						this._data.locations.length !== 0
							? `
                    <div>
                        <dt>Locations</dt>
                        <dd>${this._data.locations.map((location) => location).join(", ")}</dd>
                    </div>
                    `
							: ""
					}
                </dl>
            </div>
            <div class="details__pokemon details__stats details__hidden">
                <dl>
                ${Object.entries(this._data.stats)
					.map(
						(stat) => `
                        <div>
					        <dt>${stat[0]}</dt>
					        <dd>
                                <span>${stat[1]}</span>
                                <progress max="100" value="${stat[1]}"></progress>
                            </dd>
				        </div>
                        `,
					)
					.join("")}
                </dl>
            </div>
        </div>
        `;
	}

	addHandlerInfo() {
		this._parentElement.addEventListener("click", (event) => {
			if (!event.target.closest(".details__item")) return;

			event.preventDefault();

			document
				.querySelectorAll(".details__item")
				.forEach((element) => element.classList.toggle("details__item--active"));

			document
				.querySelectorAll(".details__pokemon")
				.forEach((element) => element.classList.toggle("details__hidden"));
		});
	}
}

export default new PokemonView();
