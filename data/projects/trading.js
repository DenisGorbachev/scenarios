import Project from "../../lib/Project"
import Actor from "../../lib/Actor"
import {storyFromMarkdown} from "../helpers"

const trading = new Project({
  uid: 'trading',
  name: 'Trading',
})

const Alice = new Actor({
  name: 'Alice',
  isPersonalized: true,
})

trading.stories.push(storyFromMarkdown(`
  ### Alice buys cryptocurrency
  
  * Alice buys cryptocurrency via regular crypto exchange if she already has BTC, ETH or USDT
  * Alice buys cryptocurrency via peer-to-peer crypto exchange if there are sellers nearby
  * Alice buys cryptocurrency via credit card crypto exchange
`))

export default trading
