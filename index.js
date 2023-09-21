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
	i;

	constructor(item) {
		super();
		if (typeof item !== "object" || Array.isArray(item))
			throw new Error("item must be an object");

		this.i = item;
	}

	attrs(dict = this.i) {
		return Object.entries(dict)
			.filter(([_k, v]) => v !== undefined)
			.map(([k, v]) => `${k}="${v}"`)
			.join(" ");
	}

	link(href, text, target) {
		return html`<a ${this.attrs({ href, target })}>${text}</a>`;
	}

	dataAttrs(dict = this.i) {
		return this.attrs(
			Object.fromEntries(
				Object.entries(dict).map(([k, v]) => [`data-${k}`, v]),
			),
		);
	}
}

export class List extends MethodTrap {
	items;

	constructor(items) {
		super();
		if (!Array.isArray(items)) throw new Error("list must be an array");
		if (typeof items[0] !== "string")
			throw new Error("list must be an array of strings");

		this.items = items;
	}
}

export class Collection extends MethodTrap {
	entities;
	entityKeys;

	constructor(entities, keys) {
		super();
		if (!Array.isArray(entities)) throw new Error("items must be an array");
		if (typeof entities[0] !== "object")
			throw new Error("items must be an array of objects");

		this.entities = entities;
		this.entityKeys = keys || Object.keys(entities[0]);
	}

	methodTrap(name, ...args) {
		console.log(`${name} called with`, args);
		return "";
	}

	#list(templateFn, tag) {
		return html`
			<${tag}>
				${this.entities.map((item) => `<li>${templateFn(item)}</li>`).join("")}
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
		const keys = this.entityKeys;
		return html`
			<table>
				<thead>
					<tr>
						${keys.map((key) => `<th>${key}</th>`).join("")}
					</tr>
				</thead>
				<tbody>
					${this.entities
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
