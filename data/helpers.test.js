import Story from '../lib/Story'
import Event from '../lib/Event'
import Person from '../lib/Actor/Person'
import { storyFromMarkdown, normalizeHTML } from './helpers'

it('parses story', () => {
  const Alice = new Person({
    title: 'Alice'
  })
  expect(storyFromMarkdown(`
  ### Alice buys cryptocurrency
  
  * Alice buys cryptocurrency via regular crypto exchange if she already has BTC, ETH or USDT
  * Alice buys cryptocurrency via peer-to-peer crypto exchange if there are sellers nearby
  * Alice buys cryptocurrency via credit card crypto exchange
    * Options:
      * https://www.coinmama.com/
  
  Notes:
  * Some note here
`, { actor: Alice })).toEqual(new Story({
    actor: Alice,
    title: 'Alice buys cryptocurrency',
    content: normalizeHTML(`
      <h3>Alice buys cryptocurrency</h3>
      <ul>
      <li>Alice buys cryptocurrency via regular crypto exchange if she already has BTC, ETH or USDT</li>
      <li>Alice buys cryptocurrency via peer-to-peer crypto exchange if there are sellers nearby</li>
      <li>Alice buys cryptocurrency via credit card crypto exchange
      <ul>
      <li>Options:
      <ul>
      <li>https://www.coinmama.com/</li>
      </ul>
      </li>
      </ul>
      </li>
      </ul>
      <p>Notes:</p>
      <ul>
      <li>Some note here</li>
      </ul>
    `.trim()),
    // events: [
    //   new Event({
    //     title: 'Alice buys cryptocurrency via regular crypto exchange if she already has BTC, ETH or USDT',
    //     actor: Alice,
    //   }),
    //   new Event({
    //     title: 'Alice buys cryptocurrency via peer-to-peer crypto exchange if there are sellers nearby',
    //     actor: Alice,
    //   }),
    //   new Event({
    //     title: 'Alice buys cryptocurrency via credit card crypto exchange',
    //     actor: Alice,
    //     extras: [
    //       {
    //         title: 'Options',
    //         points: [
    //           'https://www.coinmama.com/'
    //         ]
    //       }
    //     ]
    //   }),
    // ],
    // notes: [
    //   'Some note here'
    // ]
  }))
})
