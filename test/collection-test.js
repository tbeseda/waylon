import test from "tape";
import { Collection, untab } from "../index.js";
const html = untab; // syntax highlighting

test("waylon: Collection", (t) => {
	try {
		const wrong = new Collection("wrong");
		t.fail("Collection can't be instantiated with a string");
	} catch (error) {
		t.pass("Collection can't be instantiated with a string");
	}
	try {
		const wrong = new Collection({ thing: "wrong" });
		t.fail("Collection can't be instantiated with an object");
	} catch (error) {
		t.pass("Collection can't be instantiated with an object");
	}

	const data = [
		{ first: "Waylon", last: "Jennings", born: 1937 },
		{ first: "Willie", last: "Nelson", born: 1933 },
		{ first: "Kris", last: "Kristofferson", born: 1936 },
		{ first: "Johnny", last: "Cash", born: 1932 },
	];

	const highwaymen = new Collection(data);

	const $list = highwaymen.list(["first", "last"]);
	const $ul = highwaymen.ul("first");
	const $ol = highwaymen.ol("born");
	const $table = highwaymen.table();
	const $listSeparated = highwaymen.list(["last", "first"], ", ");
	const $listTemplated = highwaymen.list(
		({ first, last, born }) => `${first} ${last}: ${born}`,
	);

	const list = html`
		<ul>
			<li>Waylon Jennings</li>
			<li>Willie Nelson</li>
			<li>Kris Kristofferson</li>
			<li>Johnny Cash</li>
		</ul>
	`;
	const ul = html`
		<ul>
			<li>Waylon</li>
			<li>Willie</li>
			<li>Kris</li>
			<li>Johnny</li>
		</ul>
	`;
	const ol = html`
		<ol>
			<li>1937</li>
			<li>1933</li>
			<li>1936</li>
			<li>1932</li>
		</ol>
	`;
	const table = html`
		<table>
			<thead>
				<tr>
					<th>first</th>
					<th>last</th>
					<th>born</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Waylon</td>
					<td>Jennings</td>
					<td>1937</td>
				</tr>
				<tr>
					<td>Willie</td>
					<td>Nelson</td>
					<td>1933</td>
				</tr>
				<tr>
					<td>Kris</td>
					<td>Kristofferson</td>
					<td>1936</td>
				</tr>
				<tr>
					<td>Johnny</td>
					<td>Cash</td>
					<td>1932</td>
				</tr>
			</tbody>
		</table>
	`;
	const listSeparated = html`
		<ul>
			<li>Jennings, Waylon</li>
			<li>Nelson, Willie</li>
			<li>Kristofferson, Kris</li>
			<li>Cash, Johnny</li>
		</ul>
	`;
	const listTemplated = html`
		<ul>
			<li>Waylon Jennings: 1937</li>
			<li>Willie Nelson: 1933</li>
			<li>Kris Kristofferson: 1936</li>
			<li>Johnny Cash: 1932</li>
		</ul>
	`;

	t.equal($list, list, "list");
	t.equal($ul, ul, "ul");
	t.equal($ol, ol, "ol");
	t.equal($table, table, "table");
	t.equal($listSeparated, listSeparated, "listSeparated");
	t.equal($listTemplated, listTemplated, "listTemplated");

	t.end();
});
