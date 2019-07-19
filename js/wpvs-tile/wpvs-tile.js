/*
 * Copyright © 2019 Dennis Schulmeister-Zimolong
 *
 * E-Mail: dhbw@windows3.de
 * Webseite: https://www.wpvs.de/
 *
 * Dieser Quellcode ist lizenziert unter einer
 * Creative Commons Namensnennung 4.0 International Lizenz.
 */
"use strict"

import CustomElement from "../custom_element.js";
import templates from "./wpvs-tile.html";

/**
 * Custom element <wpvs-tile> to render a launchpad-like tile to navigate
 * to another page. This is used on the start page to go to the different
 * lectures and categories.
 *
 *     <wpvs-tile data-background="url(img/iotws.jpg)" date-href="#/iotws">
 *         IoT-Workshop
 *     </wpvs-tile>
 *
 * @extends CustomElement
 */
export class WpvsTileElement extends CustomElement {

    /**
     * Constructor as required for custom elements. Also parses the template
     * HTML.
     */
    constructor() {
        super();

        this.templates = document.createElement("div");
        this.templates.innerHTML = templates;

        this.postConstruct();
    }

    /**
     * Render shadow DOM to display the element.
     */
    _render() {
        // Remove old content
        this.sRoot.innerHTML = "";

        // Apply template and styles
        let cardTemplate = this.templates.querySelector("#tile-template").cloneNode(true);
        this.sRoot.innerHTML = cardTemplate.innerHTML;

        let styleElement = this.templates.querySelector("style").cloneNode(true);
        this.sRoot.appendChild(styleElement);

        // Render card content
        let containerElement = this.sRoot.querySelector(".container");

        if (this.dataset.background) {
            containerElement.style.background = this.dataset.background;
        }

        let contentElement = this.sRoot.querySelector(".content");
        contentElement.innerHTML = this.innerHTML;

        containerElement.addEventListener("click", () => {
            if (!this.dataset.href) return;

            let aElement = document.createElement("a");
            aElement.href = this.dataset.href;

            let clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            aElement.dispatchEvent(clickEvent);
        });
    }

    /**
     * Update element content when attribute values change.
     * @param {MutationRecord[]} mutations Array of all detected changes
     */
    _onAttributeChanged(mutations) {
        this.render();
    }

}

window.customElements.define("wpvs-tile", WpvsTileElement);