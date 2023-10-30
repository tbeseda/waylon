import test from 'tape'
import { Item, untab } from '../index.js'
const html = untab // syntax highlighting

test('waylon: Item', (t) => {
  t.throws(() => new Item(), "Item can't be instantiated without an argument")
  t.throws(() => new Item('wrong'), "Item can't be instantiated with a string")
  t.throws(() => new Item([]), "Item can't be instantiated with an array")
  t.doesNotThrow(() => new Item({}), 'Item can be instantiated with an empty object')

  const data = {
    first: 'Waylon',
    last: 'Jennings',
    born: 1937,
  }

  const waylon = new Item(data)
  const { i: waylonItem } = waylon

  const $link = waylon.link('/Waylon-Jennings', 'Waylon')
  const $linkBlank = waylon.link(
    'https://en.wikipedia.org/wiki/Kris_Kristofferson',
    'Waylon',
    '_blank',
  )
  const dataAttrs = waylon.dataAttrs()
  const customDataAttrs = waylon.dataAttrs({
    'first-name': waylonItem.first,
    'last-name': waylonItem.last,
  })
  const attrs = waylon.attrs()
  const customAttrs = waylon.attrs({
    'first-name': waylonItem.first,
    'last-name': waylonItem.last,
  })

  const link = html`<a href="/Waylon-Jennings">Waylon</a>`
  const linkBlank = html`<a href="https://en.wikipedia.org/wiki/Kris_Kristofferson" target="_blank">Waylon</a>`
  const dataAttrsString = 'data-first="Waylon" data-last="Jennings" data-born="1937"'
  const customDataAttrsString = 'data-first-name="Waylon" data-last-name="Jennings"'
  const attrsString = 'first="Waylon" last="Jennings" born="1937"'
  const customAttrsString = 'first-name="Waylon" last-name="Jennings"'

  t.deepEqual(waylonItem, data, 'Item.i is the same as data')
  t.equal($link, link, 'link')
  t.equal($linkBlank, linkBlank, 'link with target')
  t.equal(dataAttrs, dataAttrsString, 'data attrs')
  t.equal(customDataAttrs, customDataAttrsString, 'custom data attrs')
  t.equal(attrs, attrsString, 'attrs')
  t.equal(customAttrs, customAttrsString, 'custom attrs')

  t.end()
})
