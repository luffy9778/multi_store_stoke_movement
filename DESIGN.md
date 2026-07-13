# Multi-Store Stock Movement (MERN)

## Data Model
The application has 4 collections:
- User
- Product
- Store
- Stock
Stock document has a compound unique index on product-store .

## Preventing Negative Stock
Negative stock is prevented using a single atomic MongoDB findOneAndUpdate() operation.

When reducing stock, the update only success if the current quantity >= requested deduction. This ensuring stock never becomes negative, even in concurrent requests.

## Atomic Transfers
Stock transfers are executed inside a MongoDB transaction using session.withTransaction().

1. Decrements stock from the sourse store.
2. Increments stock in the destination store.

If any step fails, the transaction is rolled back, ensuring the transfer either completes fully or not at all.