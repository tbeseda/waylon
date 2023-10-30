import test from 'tape'
import { Collection, Item, untab } from '../index.js'
const html = untab // syntax highlighting

test('waylon: combined Collection, List, and Item', (t) => {
  const data = [
    { first: 'Waylon', last: 'Jennings', born: 1937 },
    { first: 'Willie', last: 'Nelson', born: 1933 },
    { first: 'Kris', last: 'Kristofferson', born: 1936 },
    { first: 'Johnny', last: 'Cash', born: 1932 },
  ]

  const highwaymen = new Collection(data)

  const $list = highwaymen.list((item) =>
    new Item(item).link(`/${item.first}-${item.last}`, item.first),
  )

  const list = html`
    <ul>
      <li><a href="/Waylon-Jennings">Waylon</a></li>
      <li><a href="/Willie-Nelson">Willie</a></li>
      <li><a href="/Kris-Kristofferson">Kris</a></li>
      <li><a href="/Johnny-Cash">Johnny</a></li>
    </ul>
  `

  t.equal($list, list, 'Collection.list with Item.link')

  t.end()
})
