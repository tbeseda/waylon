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

	t.end();
});
