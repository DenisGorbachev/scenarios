import Story from "../lib/Story"
import {storyFromMarkdown} from "./helpers"

it('parses story', () => {
  expect(storyFromMarkdown(`
  ### Alice buys cryptocurrency
  
  * Alice buys cryptocurrency via regular crypto exchange if she already has BTC, ETH or USDT
  * Alice buys cryptocurrency via peer-to-peer crypto exchange if there are sellers nearby
  * Alice buys cryptocurrency via credit card crypto exchange
`)).toBe(new Story(

  ));
});
