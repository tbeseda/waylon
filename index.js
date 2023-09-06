export function untab(string) {
	return string.replace(/>\s+</g, "><").trim();
}

const html = untab; // syntax highlighting

export class Item {}

export class List {}

export class Collection {
	items;
	likelyKeys;

	constructor(items) {
		if (!Array.isArray(items)) throw new Error("items must be an array");
		if (typeof items[0] !== "object")
			throw new Error("items must be an array of objects");

		this.items = items;
		this.likelyKeys = Object.keys(items[0]);
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	ul(key) {
		return html(`
			<ul>
				${this.items.map((item) => `<li>${item[key]}</li>`).join("")}
			</ul>
		`);
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	ol(key) {
		return html(`
			<ol>
				${this.items.map((item) => `<li>${item[key]}</li>`).join("")}
			</ol>
		`);
	}

	/** @returns {string} HTML table */
	table() {
		const keys = this.likelyKeys;
		return html(`
			<table>
				<thead>
					<tr>
						${keys.map((key) => `<th>${key}</th>`).join("")}
					</tr>
				</thead>
				<tbody>
					${this.items
						.map(
							(item) => `
						<tr>
							${keys.map((key) => `<td>${item[key]}</td>`).join("")}
						</tr>
					`,
						)
						.join("")}
				</tbody>
			</table>
		`);
	}

	/**
	 * @param {string[] | function} keysOrFn
	 * @param {string} separator
	 * @returns {string}
	 */
	list(keysOrFn, separator = " ") {
		let templateFn;
		if (typeof keysOrFn === "function") {
			templateFn = keysOrFn;
		} else {
			templateFn = (item) => keysOrFn.map((key) => item[key]).join(separator);
		}

		return html(`
			<ul>
				${this.items.map((item) => `<li>${templateFn(item)}</li>`).join("")}
			</ul>
		`);
	}
}
