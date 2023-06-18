# Mirrar

Mirrar is an API for managing products and their variants. It provides functionalities for creating, reading, updating, and deleting products and their associated variants.

## Installation

To run the Mirrar API, follow the steps below:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd mirrar
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The Mirrar API should now be running on `http://localhost:3000`.

## Usage

Once the server is running, you can interact with the API using HTTP requests. You can use tools like cURL, Postman, or any other HTTP client to make requests to the API endpoints.

## API Endpoints

The Mirrar API provides the following endpoints:
GET /products: Retrieves all products.
POST /products: Creates a new product.
PATCH /products/:productId: Updates a product by ID.
DELETE /products/:productId: Deletes a product by ID.

Search
GET /search: Performs a search query to retrieve products based on specified criteria.

## Dependencies

The Mirrar API has the following dependencies:

- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.2.0
- express: ^4.18.2
- lodash: ^4.17.21
- mysql2: ^3.3.5
- nodemon: ^2.0.22
- sequelize: ^6.32.0
- sinon: ^15.1.2

## Dev Dependencies

The Mirrar API has the following dev dependencies:

- @babel/register: ^7.22.5
- chai: ^4.3.7
- mocha: ^10.2.0
- supertest: ^6.3.3


Feel free to explore and modify the Mirrar API according to your needs. If you have any questions or need further assistance, please don't hesitate to reach out.

