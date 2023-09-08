export function untab(ss, ...vs) {
	let r = "";
	ss.forEach((s, i) => {
		r += `${s}${i === ss.length - 1 ? "" : vs[i]}`;
	});
	return r.replace(/>\s+</g, "><").trim();
}
const html = untab; // syntax highlighting

class MethodTrap {
	constructor() {
		const handlers = {
			get(target, prop, receiver) {
				if (Reflect.has(target, prop))
					return Reflect.get(target, prop, receiver);
				else {
					return function (...args) {
						return Reflect.get(target, "methodTrap").call(
							receiver,
							prop,
							...args,
						);
					};
				}
			},
		};

		return new Proxy(this, handlers);
	}

	methodTrap(name) {
		throw new Error(`Method ${name} not implemented`);
	}
}

export class Item extends MethodTrap {
	constructor(item) {
		super();
		if (typeof item !== "object" || Array.isArray(item))
			throw new Error("item must be an object");
	}
}

export class List extends MethodTrap {
	constructor(list) {
		super();
		if (!Array.isArray(list)) throw new Error("list must be an array");
		if (typeof list[0] !== "string")
			throw new Error("list must be an array of strings");
	}
}

export class Collection extends MethodTrap {
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

	methodTrap(name, ...args) {
		console.log(`${name} called with`, args);
		return "";
	}

	#list(templateFn, tag) {
		return html`
			<${tag}>
				${this.items.map((item) => `<li>${templateFn(item)}</li>`).join("")}
			</${tag}>
		`;
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
		return html`
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
		`;
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
