# Nextwave Stock Manager

A simple inventory management interface that can now persist data on a
SQLite database via a Node.js API.

Features include:
- Automatically numbered references
- Adding items with price, quantity, description, category and optional photo
- Filtering the inventory by category
- Viewing movement history
- A statistics tab showing total quantity and value of stock

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   This runs the site using [Vite](https://vitejs.dev/).
3. Start the API server (requires Node.js on port 3001):
   ```bash
   npm run server
   ```
