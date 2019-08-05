## Exchange updates latest price

* Alice places an order to buy 1 BTC for 10000 USD.
* Bob places an order to sell 1 BTC for 10000 USD.
* Exchange matches orders:
  * Exchange removes both orders from orderbook.
  * Exchange adds a trade to latest trade list:
    * Price: 10000 USD.
    * Amount: 1 BTC.
    * Type: sell (because Bob placed a sell order after Alice).
  * Exchange updates ticker
    * Symbol: BTCUSD
    * Latest trade price: 10000 USD
