## Woovi Challenge

- Send a transaction
- Receive a transaction
- Calculate the available balance of an account

## Features

### Prevent duplicate transactions due to retries

- Store the idempotency key with the transaction (easy to audit requests).
- If a key already exists, do not reprocess and return the original result.

### Concurrent Transactions

- MongoDB ACID Transactions
- Pessimistic locking
  - findOneAndUpdate with $gte to ensure that account have balance for transactiion (for withdraws and transfer)
  - Fail if the document is locked and return 423 (frontend must retry this request)
- At end check if balance in ledger is equal to account balance

#### Different Transactions Types

- Deposit
- Transfer
  - record two entries in the ledger collection: a debit and a credit
- Withdraw (Bonus)

#### Double-Entry Accounting

- Every transaction between accounts record two entries in the ledger collection: a debit and a credit

### Balance

- The balance of each account MUST always equal the sum of ledger entries
- Maybe a periodic reconciliation job to verify the ledger matches the balance.

### External API Integration

- Outbox Pattern
- Every Transaction starts with status "PENDING" and add a job to a queue.
- Background worker listen the queue and process the integration (BullMQ)
- It can avoid update the same accountid at the same time.
- Update the transaction status and create a document in Ledger collection
- In error retry with exponencial backoff

## Collections

### Account

- name
- balance

### Transaction

- amount in cents (INT)
- fromAccount
- status ("PENDING" | "SUCCESS" | "FAILED")
- transactionType ("DEPOSIT" | "TRANSFER" | "WITHDRAW")

### Deposit extends Transaction

- source ("PIX" | "TED")

### Transfer extends Transaction

- toAccount

### Ledger

- amount in cents (INT)
- transactionType ("DEBIT" | "CREDIT")
- transaction
- account
- finalBalance in cents (INT)
- idempotencyKey
