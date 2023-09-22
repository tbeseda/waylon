import test from "tape";
import { List, untab } from "../index.js";
const html = untab; // syntax highlighting

test("waylon: List", (t) => {
	t.throws(() => new List(), "List can't be instantiated without an argument");
	t.throws(() => new List("wrong"), "List can't be instantiated with a string");
	t.throws(() => new List({foo: "bar"}), "List can't be instantiated with object");
	t.doesNotThrow(() => new List([]), "List can be instantiated with an empty array");

	const data = ["Waylon", "Willie", "Kris", "Johnny"];

	const highwaymen = new List(data);

	t.deepEqual(highwaymen.items, data, "List.list is the same as data");

	t.end();
});
