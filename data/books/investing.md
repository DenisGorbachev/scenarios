# Investing

Investing stories outline the best practices for investors & funds.

## Stories

### Exchange prevents fund [manager](#manager) from withdrawing investor capital

* Investor deposits capital to exchange.
* Investor creates an API key for manager:
  * Permissions: read history, place orders (note: no "request withdrawals").
* Investor provides API key to manager.
* Manager sends a withdrawal request.
* Exchange rejects the withdrawal request:
  * Message: "This API key does not have 'request withdrawals' permission".

### Bank allows company [CEO](#ceo) to withdraw investor capital

* Investor deposits capital to company A's bank account.
* CEO registers company B.
* CEO signs an agreement for software development services between company A and company B.
* CEO sends a transfer request from company A bank account to company B bank account.
* Bank approves the transfer request.

## Definitions 

### Manager

Manager is a person who allocates investor capital between trading strategies.

### CEO

CEO is a person who makes high-level operational decisions within company.
