import test from "tape";
import { untab, $Collection } from "../index.js";

test("htm: collection", (t) => {
	const items = [
		{ a: 1, b: 2 },
		{ a: 3, b: 4 },
		{ a: 5, b: 6 },
	];
	const collection = new $Collection(items);

	const table = collection.table();
	const expectedTable = untab(`
		<table>
			<thead>
				<tr>
					<th>a</th>
					<th>b</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
				</tr>
				<tr>
					<td>3</td>
					<td>4</td>
				</tr>
				<tr>
					<td>5</td>
					<td>6</td>
				</tr>
			</tbody>
		</table>
	`);

	t.equal(table, expectedTable, "created a table");

	const ul = collection.ul("a");
	const expectedUl = untab(`
		<ul>
			<li>1</li>
			<li>3</li>
			<li>5</li>
		</ul>
	`);

	t.equal(ul, expectedUl, "created a ul");

	const ol = collection.ol("a");
	const expectedOl = untab(`
		<ol>
			<li>1</li>
			<li>3</li>
			<li>5</li>
		</ol>
	`);

	t.equal(ol, expectedOl, "created a ol");

	const list = collection.list(["a", "b"]);
	const expectedList = untab(`
		<ul>
			<li>1 2</li>
			<li>3 4</li>
			<li>5 6</li>
		</ul>
	`);

	t.equal(list, expectedList, "created a list");

	const listSeparated = collection.list(["a", "b"], " | ");
	const expectedListSeparated = untab(`
		<ul>
			<li>1 | 2</li>
			<li>3 | 4</li>
			<li>5 | 6</li>
		</ul>
	`);

	t.equal(
		listSeparated,
		expectedListSeparated,
		"created a list with a custom separator",
	);

	const listTemplated = collection.list(({ a, b }) => `${a + b} | ${b - a}`);
	const expectedListTemplated = untab(`
		<ul>
			<li>3 | 1</li>
			<li>7 | 1</li>
			<li>11 | 1</li>
		</ul>
	`);

	t.equal(
		listTemplated,
		expectedListTemplated,
		"created a list with a custom template",
	);

	t.end();
});
