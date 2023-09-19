import test from "tape";
import { Item, untab } from "../index.js";
const html = untab; // syntax highlighting

test("waylon: Item", (t) => {
	try {
		const wrong = new Item("wrong");
		t.fail("Item can't be instantiated with a string");
	} catch (error) {
		t.pass("Item can't be instantiated with a string");
	}
	try {
		const wrong = new Item(["wrong"]);
		t.fail("Item can't be instantiated with an array");
	} catch (error) {
		t.pass("Item can't be instantiated with an array");
	}

	const data = {
		first: "Waylon",
		last: "Jennings",
		born: 1937,
	};

	const waylon = new Item(data);

	const $link = waylon.link("/Waylon-Jennings", "Waylon");
	const $link_blank = waylon.link(
		"https://en.wikipedia.org/wiki/Kris_Kristofferson",
		"Waylon",
		"_blank",
	);
	const dataAttrs = waylon.dataAttrs();
	const customDataAttrs = waylon.dataAttrs({
		"first-name": waylon.item.first,
		"last-name": waylon.item.last,
	});
	const attrs = waylon.attrs();
	const customAttrs = waylon.attrs({
		"first-name": waylon.item.first,
		"last-name": waylon.item.last,
	});

	const link = html`<a href="/Waylon-Jennings">Waylon</a>`;
	const link_blank = html`<a href="https://en.wikipedia.org/wiki/Kris_Kristofferson" target="_blank">Waylon</a>`;
	const dataAttrsString = `data-first="Waylon" data-last="Jennings" data-born="1937"`;
	const customDataAttrsString = `data-first-name="Waylon" data-last-name="Jennings"`;
	const attrsString = `first="Waylon" last="Jennings" born="1937"`;
	const customAttrsString = `first-name="Waylon" last-name="Jennings"`;

	t.deepEqual(waylon.item, data, "Item.item is the same as data");
	t.equal($link, link, "link");
	t.equal($link_blank, link_blank, "link with target");
	t.equal(dataAttrs, dataAttrsString, "data attrs");
	t.equal(customDataAttrs, customDataAttrsString, "custom data attrs");
	t.equal(attrs, attrsString, "attrs");
	t.equal(customAttrs, customAttrsString, "custom attrs");

	t.end();
});
