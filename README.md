# Nextwave Site

This project uses an Express server with a SQLite database to store product information. The database is automatically created and populated with demo products when the server starts.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server and front-end in two separate terminals:
   ```bash
   npm start       # starts the API server on port 3001
   npm run dev     # starts the Vite dev server for the React app
   ```

The React app fetches products from `http://82.67.146.55:3001/api/products`.
