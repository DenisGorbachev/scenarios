import Book from '../../lib/Book'
import Section from '../../lib/Section'
import Page from '../../lib/Page'
import Story from '../../lib/Story'
import Person from '../../lib/Actor/Person'
import { storyFromMarkdown, bookFromMarkdown, normalizeHTML, normalizeMarkdown, withUid } from '../../data/helpers'

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
    uid: 'alice-buys-cryptocurrency',
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

it('parses book', () => {
  expect(bookFromMarkdown(`
  # Spacedrop

  Spacedrop is an application that allows bounty hunters to receive airdrops.

  ## Stories

  ### Bob receives an airdrop for Krypton book

  - Bob opens https://spacedrop.io/book/krypton
  - Bob reads book description

  ## Definitions

  ### Bob

  Bob is an expert bounty hunter.

  Fears:
  - Fears losing time
    - Fears performing work for zero-value airdrop
  - Fears losing status
    - Fears promoting scam book
  `)).toEqual(new Book(withUid({
    title: 'Spacedrop',
    content: normalizeHTML(`<p>Spacedrop is an application that allows bounty hunters to receive airdrops.</p>`.trim()),
    sections: [
      new Section(withUid({
        title: 'Stories',
        pages: [
          new Page(withUid({
            title: 'Bob receives an airdrop for Krypton book',
            points: [
              'Bob opens https://spacedrop.io/book/krypton',
              'Bob reads book description'
            ]
          }))
        ]
      })),
      new Section(withUid({
        title: 'Definitions',
        pages: [
          new Page(withUid({
            title: 'Bob',
            content: normalizeHTML(`
              <p>Bob is an expert bounty hunter.</p>
              <p>Fears:</p>
              <ul>
              <li>Fears losing time
              <ul>
              <li>Fears performing work for zero-value airdrop</li>
              </ul>
              </li>
              <li>Fears losing status
              <ul>
              <li>Fears promoting scam book</li>
              </ul>
              </li>
              </ul>
            `)
          }))
        ]
      })),
    ]
  })))
})
