# Stories

## Exchange updates latest price

* Alice places an [order](#order) to buy 1 BTC for 10000 USD.
* Bob places an [order](#order) to sell 1 BTC for 10000 USD.
* Exchange matches orders:
  * Exchange removes both orders from orderbook.
  * Exchange adds a trade to latest trade list:
    * Price: 10000 USD.
    * Amount: 1 BTC.
    * Type: sell (because Bob placed a sell order after Alice).
  * Exchange updates ticker
    * Symbol: BTCUSD
    * Latest trade price: 10000 USD

# Definitions

## Order

Order is an instruction to buy or sell a specified amount of asset at specified price.

* Fields:
  * Symbol
    * Example: "BTCUSD"
    * Type: String
    * Validations:
      * Appears in array of symbols tradable on current exchange
  * Price
    * Example: 7500.0
    * Type: Float
    * Validations:
      * Greater than 0
  * Amount
    * Example: 10.0
    * Type: Float
    * Validations:
        * Greater than 0
  * Placed at
    * Example: 2019-08-05 22:45:02 UTC
    * Type: Timestamp
  * Is cancelled
    * Example: Yes / No
    * Type: Boolean
    * Notes:
      * Cancelled orders are removed from orderbook
      * Partially filled orders may still be cancelled (in this case, the remaining amount will not be filled).
* Validations:
  * On insert:
    * Validate that available balance of current user is higher than sum of already placed order amounts + new order amount
