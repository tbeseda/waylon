
<h1 align="center">☣️ This is a prototype!</h1>
<p align="center">
  <strong>Don't go putting this into production.</strong><br>
  <em>I'm a Ramblin' Man</em><br>
  <br><br><br><br>
  ...
  <br><br><br><br>
</p>


<h1 align="center">Waylon 🌵</h1>

<p align="center">
  HTML string helpers, particularly great in Node.js string template literals.<br>
  <em>Lonesome, On'ry, and Mean</em><br>
  <a href="https://www.npmjs.com/package/waylon"><strong>waylon on npmjs.org »</strong></a><br>
  <br>
  Entities:
  <a href="#Item">Item</a>
  •
  <a href="#List">List</a>
  •
  <a href="#Collection">Collection</a>
</p>

## Install

```
npm i waylon
```

## Usage

📝 **Some goals, thoughts, notes:**
- Class methods always return a string of HTML
- User never *has* to author a bracketed HTML tag
- `$` generally denotes "this thing is HTML"

### Item

wip... Suggestions? File an issue.

### List

wip... Suggestions? File an issue.

### Collection

When you've got an array of objects: `Collection`

```js
import { Collection } from "waylon";

const data = [
  { first: "Waylon", last: "Jennings", born: 1937 },
  { first: "Willie", last: "Nelson", born: 1933 },
  { first: "Kris", last: "Kristofferson", born: 1936 },
  { first: "Johnny", last: "Cash", born: 1932 },
];

const highwaymen = new Collection(data);
```

🎶 I Ain't Living Long Like This...

```js
const $list = highwaymen.list(["first", "last"]);
```
<ul><li>Waylon Jennings</li><li>Willie Nelson</li><li>Kris Kristofferson</li><li>Johnny Cash</li></ul>

```js
const $ul = highwaymen.ul("first");
```
<ul><li>Waylon</li><li>Willie</li><li>Kris</li><li>Johnny</li></ul>

```js
const $ol = highwaymen.ol("born");
```
<ol><li>1937</li><li>1933</li><li>1936</li><li>1932</li></ol>

```js
const $table = highwaymen.table();
```
<table><thead><tr><th>first</th><th>last</th><th>born</th></tr></thead><tbody><tr><td>Waylon</td><td>Jennings</td><td>1937</td></tr><tr><td>Willie</td><td>Nelson</td><td>1933</td></tr><tr><td>Kris</td><td>Kristofferson</td><td>1936</td></tr><tr><td>Johnny</td><td>Cash</td><td>1932</td></tr></tbody></table>

```js
const $listSeparated = highwaymen.list(["last", "first"], ", ");
```
<ul><li>Jennings, Waylon</li><li>Nelson, Willie</li><li>Kristofferson, Kris</li><li>Cash, Johnny</li></ul>

```js
const $listTemplated = highwaymen.list(
  ({ first, last, born }) => `${first} ${last}: ${born}`,
);
```
<ul><li>Waylon Jennings: 1937</li><li>Willie Nelson: 1933</li><li>Kris Kristofferson: 1936</li><li>Johnny Cash: 1932</li></ul>


Also see `./test/collection-test.js`

## FAQ

<details>
<summary>Why "<code>waylon</code>"?</summary>

`waylon` is pretty scrappy. No dependencies, simple, and straight forward. Not necessarily revolutionary, but not going to conform to the mainstream ~~Nashville Sound~~ way of making HTML.

Also, I was squatting the name on npmjs.org because I'm a big fan of Waylon Jennings. But I don't want to be that guy and just hold a great name. So here we are!

</details>

---

It's just strings. Plus, I've never been to Spain.
