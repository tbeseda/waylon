import test from "tape";
import { List, untab } from "../index.js";
const html = untab; // syntax highlighting

test("waylon: List", (t) => {
	try {
		const wrong = new List("wrong");
		t.fail("List can't be instantiated with a string");
	} catch (error) {
		t.pass("List can't be instantiated with a string");
	}
	try {
		const wrong = new List({ thing: "wrong" });
		t.fail("List can't be instantiated with an object");
	} catch (error) {
		t.pass("List can't be instantiated with an object");
	}

	const data = ["Waylon", "Willie", "Kris", "Johnny"];

	const highwaymen = new List(data);

	t.end();
});
