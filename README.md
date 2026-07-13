# Multi-Store Stock Movement (MERN)

## Prerequisites
- Node.js
- MongoDB (with replica set or atlas)
- npm

Create a .env file using .env.example in both client and server.

## Backend Setup
cd server
npm install
npm start

## Frontend Setup
cd client
npm install
npm run dev

## Database Seeding
npm run seed

### Admin
- Email: admin@test.com
- Password: password123

### Shopper
- Email: shopper@test.com
- Password: password123

## API Documentation
http://localhost:5000/api-docs

## Running Tests
npm test

## Assumptions
- Only admin can create products, stores, adjust stock, and transfer stock.
- Shopper have read-only access.

## Trade-offs
- Minimal UI with focus on backend functionality.