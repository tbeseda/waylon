export function untab(string) {
	return string.replace(/>\s+</g, "><").trim();
}

const html = untab; // syntax highlighting

class Haxy {
	constructor() {
		// biome-ignore:
		return new Proxy(this, {
			get(object, key, _proxy) {
				if (key in object) {
					return object[key];
				} else {
					// handle missing methods
					return undefined;
				}
			},
		});
	}
}

export class Item {}

export class List {}

export class Collection extends Haxy {
	items;
	itemsKeys;

	constructor(items, keys) {
		super();
		if (!Array.isArray(items)) throw new Error("items must be an array");
		if (typeof items[0] !== "object")
			throw new Error("items must be an array of objects");

		this.items = items;
		this.itemsKeys = keys || Object.keys(items[0]);
	}

	#list(templateFn, tag) {
		return html(`
			<${tag}>
				${this.items.map((item) => `<li>${templateFn(item)}</li>`).join("")}
			</${tag}>
		`);
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	ul(key) {
		return this.#list((item) => item[key], "ul");
	}

	/**
	 * @param {string} key
	 * @returns {string}
	 */
	ol(key) {
		return this.#list((item) => item[key], "ol");
	}

	/** @returns {string} HTML table */
	table() {
		const keys = this.itemsKeys;
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

		return this.#list(templateFn, "ul");
	}
}
