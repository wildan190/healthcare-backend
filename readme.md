# Healthcare API

Healthcare API is a RESTful API built with Node.js, Express, and Sequelize. It provides endpoints for authentication and product management.

## Installation

1. Create a database named `healthcare`.
2. .env configuration:
   ```
   PORT=5001
   DB_HOST=localhost
   DB_NAME=healthcare
   DB_USER=postgres
   DB_PASSWORD=manchester
   JWT_SECRET=your_jwt_secret
   ```
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the server.

## Testing

1. Run `npm test` to run the tests.

## Endpoints

### Authentication

* `POST /api/auth/login`: Login with username and password.
* `POST /api/auth/register`: Register a new user.

### Products

* `GET /api/products`: Get all products.
* `POST /api/products`: Create a new product.
* `GET /api/products/:id`: Get a product by ID.
* `PUT /api/products/:id`: Update a product.
* `DELETE /api/products/:id`: Delete a product.

## Using Postman

You can use Postman to test the API endpoints. Make sure to set the correct endpoint and method (GET, POST, PUT, DELETE) for each request.

For example, to login, send a `POST` request to `http://localhost:5000/api/auth/login` with the following JSON body:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

To register, send a `POST` request to `http://localhost:5000/api/auth/register` with the following JSON body:

```json
{
  "name": "your_name",
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
```
