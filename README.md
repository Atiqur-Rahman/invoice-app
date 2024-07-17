# Invoice Application

A simple Invoice Application built using React.js featuring a shopping website interface with invoice download.

## Features

- It's shopping website, where you can select product.
- Add to Inventory and you can add as mush quantity as you want.
- From the Inventory you can create Invoice.
- Also you can download the Invoice.
- The application is responsive and looks good on different screen sizes.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Atiqur-Rahman/invoice-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd invoice-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. ```

## Project Structure

```plaintext
.
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   ├── Products
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── ProductList.js
│   │   ├── Inventory.js
│   │   ├── Invoice.js
│   │   ├── Navbar.js
│   │   └── ...
│   ├── contexts
│   │    ├── AuthContext.js
│   │    ├── InvoiceContext.js
│   │    ├── ProductContext.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── package.json
└── README.md
...
```
