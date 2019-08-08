# CheckMyTrades

CheckMyTrades is an app where smart investors choose profitable traders to manage their capital.

## Stories

### [Trader](#trader) learns about CheckMyTrades
* Trader creates a public post with trade idea
* Employee adds a comment
  * Text: "Are you a profitable trader? If yes - why not publish your trade history here: https://checkmytrades.tech/"
* Trader clicks on CheckMyTrades link in comment

### [Investor](#investor) learns about CheckMyTrades via trader profile
* [Trader learns about CheckMyTrades](#trader-learns-about-checkmytrades)
* [Trader signs up](#trader-signs-up)
* Trader adds a link to CheckMyTrades to his profile
  * URL: https://checkmytrades.tech/CryptoCred 
* Trader creates a public post with trade idea
* Investor opens Trader profile
* Investor clicks on CheckMyTrades link in Trader profile

### [Investor](#investor) checks trade history
* Investor decides to check whether CryptoCred the Trader is profitable
* Investor opens https://checkmytrades.tech/CryptoCred
* Investor selects metric calculation parameters
  * Period
    * Widget: Select with options
      * Last 3 months
      * Last 6 months
      * Last year
      * All time
    * Default: Last 3 months
    * Note: Set `from` and `to` fields when select changes
      * Rationale 
        * We'll add "Custom" option to select, allowing investor to choose custom date interval
* Investor reads metrics calculated from CryptoCred trades
  * Notes 
    * Absolute values are displayed if Trader enables "Show trade amounts"
  * Metrics:
    * Profit: 23% (589 USD)
    * Drawdown: -40% (-2058 USD)
    * Final capital: 8150 USD
* Investor clicks on "Next page"

### Investor subscribes to "new trade" notifications
* Investor opens https://checkmytrades.tech/CryptoCred
* Investor sees an email subscription form
* Investor enters his email
* Investor clicks on "Subscribe"
* Investor sees "Receive notifications in Telegram: https://t.me/CheckMyTradesBot?start=CryptoCred"
* Investor clicks on link
* Investor confirms subscription to CryptoCred trades

### Trader signs up
* Trader opens https://checkmytrades.tech/
* Trader clicks "Sign up"
* Trader enters his email & password
* System sends a confirmation email
* Trader confirms his email

### Trader adds exchange account
* Trader clicks "Add exchange account"
* Trader reads: "Read-only permissions required - we can't place orders or initiate withdrawals"
  * Rationale 
    * Trader fears that his API key will be used to place orders
* Trader selects exchange
* Trader reads a complete instruction with screenshots that describes how to get an API key for selected exchange
* Trader enters API key
* Trader enters API secret
* Trader unchecks "Show trade amounts" checkbox
  * Notes 
    * Checked by default
* Trader submits form
* ~ System saves API key & secret if form is valid
  * System checks if API key & secret are valid
    * System makes a single API request to read trade history
    * System doesn't make additional API requests to read full trade history
      * Rationale 
        * Trader doesn't want to wait
* ~ System displays errors if form is invalid

### _(draft)_ System calculates "Profit" metric
* Ideas:
  * Show assets for period + cost + unrealized profit (accounting for slippage, which should be determined by orderbook depth ~ can use CoinMarketBook)
* Decisions: 
  * How to calculate metric if position has been taken before selected period?
    * Ideally: get full trade history, calculate position open and close timestamps, exclude open positions from selected period
  * How to calculate metric if position has been taken on one exchange and closed on another?
    * Track all exchanges
    * Show position as pending if Trader hasn't connected another exchange
  * How to calculate metric if position has been opened / closed on exchange that is already down?
    * Allow to manually add trades
      * Mark them as added manually
  * How to calculate metric over deposits / withdrawals?
    * Use position size for calculations
      * Calculate profit per unit of base asset?
      
### _(draft)_ Trader chooses an unsupported exchange while adding API key

### _(draft)_ Investor receives a notification with full trade idea (including stop-loss & take-profit levels)

### User requests a feature
* User opens https://checkmytrades.tech/
* User clicks "Send message" icon in bottom-right corner
* User joins Telegram group
* User sends a message with feature request

### CEO develops CheckMyTrades
* [x] CEO publishes service description
* [ ] CEO designs a trader acquisition method
  * Notes 
    * Traders provide content that can be utilized for generating initial messages
  * CEO validates the method by receiving 10 subscriptions with min 5% conversion rate
* [ ] CEO designs an investor acquisition method
  * CEO tests "[Investor learns about CheckMyTrades via trader profile]"
    * CEO validates method by reaching 10 links total & 50 unique visitors per day

### CEO designs a trader acquisition method
* CEO tests direct trader acquisition method
  * CEO hires a salesperson
    * CEO describes the task
    * CEO sends initial messages to employee acquisition channels
    * CEO chooses the employee
  * [Salesperson tests a direct trader acquisition method](#salesperson-tests-a-direct-trader-acquisition-method)
* CEO designs another trader acquisition method until he finds one that works

### Salesperson tests a direct trader acquisition method

* Salesperson starts extracting trader contacts:
  * Salesperson gets a list of trading groups:
    * Discord servers.
    * Telegram groups.
  * Salesperson gets a list of prominent traders:
    * Crypto Twitter.
    * TradingView.
* For each trader contact:
  * [Salesperson persuades the trader to provide a read-only API key](#salesperson-persuades-the-trader-to-provide-a-read-only-api-key) that gives access to his trading history.
    * Salesperson

### Salesperson persuades the trader to provide a read-only API key

_Draft:_
* Salesperson sends an initial message.
* 

Notes:
* CTA: Get featured on CheckMyTrades - get more investor capital for management

## Definitions 

### Trader

Trader is a [user](#user) who has developed his own trading strategy & wants to scale by raising investor capital.

* Fears losing status
  * Fears being perceived as unprofitable trader
* Fears losing wealth
  * Fears disclosing his capital amount
  * Fears being frontrun by its followers
    * Allow to hide recent X days of trade history (only show that trade happened)
  * Fears that his API key will be used to place orders / initiate withdrawals

### Investor

Investor is a [user](#user) who want to put his capital under management of profitable trader.

* Fears losing wealth
* Fears investing in unprofitable traders / bots
* Fears missing out on investing in profitable traders / bots
  * Profitable traders / bots limit their investment capital, because their strategies become less profitable with higher capital amounts

### User

User is a person who signed up for CheckMyTrades.

Model:
* Email
  * Type: String
  * Index: Unique
* Password
  * Type: String
  * Note: Hashed
* Reset password token
  * Type: String
* Show absolute amounts in trade history
  * Type: Boolean

### Acquisition method

Acquisition method is a way of attracting users of specific type, expressed as a story and verified through multiple executions.

Acquisition method is similar to "acquisition channel" in marketing, but a single acquistion method may use multiple channels.
