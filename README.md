# DPDzero Backend Assignment for Data Storage and User Management

This is a backend system developed using Node.js and Express framework, along with Sequelize ORM for data storage and management. It provides APIs for user registration, generating access tokens, storing and retrieving key-value data.

## Table of Contents

- Framework
- Database Schema
- Getting Started
  - Prerequisites
  - Installation
- API Documentation
  - User Registration
  - Generate Token
  - Store Data
  - Retrieve Data
  - Update Data
  - Delete Data

## Framework

The backend system is developed using the following technologies and libraries:

- Node.js
- Express.js
- Sequelize ORM
- bcryptjs (for password hashing)
- MySQL database

## Database Schema

The database schema includes two main tables:

1. `Users`: Stores user information including username, email, hashed password, full name, age, and gender.

2. `Data`: Stores key-value pairs for data storage.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Ajay-Maury/DPDzero-Backend-Assignment.git
   ```

2. Navigate to the project directory:

   ```
   cd DPDzero-Backend-Assignment
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the project root directory and provide the following configuration:

   
- `DB_HOST`: Hostname of the MySQL database.
- `DB_PORT`: Port number of the MySQL database.
- `DB_NAME`: Name of the MySQL database.
- `DB_USER`: Username for connecting to the MySQL database.
- `DB_PASSWORD`: Password for connecting to the MySQL database.
- `JWT_SECRET_KEY`: Secret key for JWT token generation.
- `PORT`: Port on which the server will run.
  
   An example `.env.example` file is provided for reference:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=backend_system_db
   DB_USER=root
   DB_PASSWORD=yourpassword
   JWT_SECRET_KEY=mysecretkey
   PORT=3000
   ```

5. Run the server:

   ```
   npm start
   ```

The server will start on the specified port (default: 3000).

Absolutely, I'll make the API Documentation section clearer. Here's the updated version:


## API Documentation

# 1. User Registration

**Endpoint**: `POST /api/register`

Allows users to register with the system by providing username, email, password, full name, age, and gender.

# Request

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "secure_password123",
  "full_name": "John Doe",
  "age": 30,
  "gender": "male"
}
```

# Success Response

```json
{
  "status": "success",
  "message": "User successfully registered!",
  "data": {
    "user_id": "12345",
    "username": "example_user",
    "email": "user@example.com",
    "full_name": "John Doe",
    "age": 30,
    "gender": "male"
  }
}
```

# Error Response

```json
{
  "status": "error",
  "code": "INVALID_REQUEST",
  "message": "Invalid request. Please provide all required fields: username, email, password, full_name."
}
```

- `USERNAME_EXISTS`: The provided username is already taken. Please choose a different username.
- `EMAIL_EXISTS`: The provided email is already registered. Please use a different email address.
- `INVALID_PASSWORD`: The provided password does not meet the requirements.
- `INVALID_AGE`: Invalid age value. Age must be a positive integer.
- `GENDER_REQUIRED`: Gender field is required. Please specify the gender (e.g., male, female, non-binary).
- `INTERNAL_SERVER_ERROR`: An internal server error occurred. Please try again later.

# 2. Generate Token

**Endpoint**: `POST /api/token`

Generates an access token for a user based on the provided username and password.

# Request

```json
{
  "username": "example_user",
  "password": "secure_password123"
}
```

# Response

```json
{
  "status": "success",
  "message": "Access token generated successfully.",
  "data": {
    "access_token": "<TOKEN>",
    "expires_in": 3600
  }
}
```

- `INVALID_CREDENTIALS`: Invalid credentials. The provided username or password is incorrect.
- `MISSING_FIELDS`: Missing fields. Please provide both username and password.
- `INTERNAL_ERROR`: Internal server error occurred. Please try again later.

# 3. Store Data

**Endpoint**: `POST /api/data`

Stores a key-value pair in the database. Requires authentication using a valid access token.

# Request

**Request Headers**:
Authorization: Bearer access_token

```json
{
  "key": "unique_key",
  "value": "data_value"
}
```

# Response

```json
{
  "status": "success",
  "message": "Data stored successfully."
}
```

- `INVALID_KEY`: The provided key is not valid or missing.
- `INVALID_VALUE`: The provided value is not valid or missing.
- `KEY_EXISTS`: The provided key already exists in the database. To update an existing key, use the update API.
- `INVALID_TOKEN`: Invalid access token provided

# 4. Retrieve Data

**Endpoint**: `GET /api/data/{key}`

Retrieves the value associated with a specific key. Requires authentication using a valid access token.

# Request Headers

- **`Authorization`**: Bearer **`access_token`**

# Response

```json
{
  "status": "success",
  "data": {
    "key": "unique_key",
    "value": "data_value"
  }
}
```

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided

# 5. Update Data

**Endpoint**: `PUT /api/data/{key}`

Updates the value associated with an existing key. Requires authentication using a valid access token.

# Request

**Request Headers**:
Authorization: Bearer access_token

```json
{
  "value": "new_data_value"
}
```

# Response

```json
{
  "status": "success",
  "message": "Data updated successfully."
}
```

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided

# 6. Delete Data

**Endpoint**: `DELETE /api/data/{key}`

Deletes a key-value pair from the database. Requires authentication using a valid access token.

# Request Headers

- **`Authorization`**: Bearer **`access_token`**

# Response

```json
{
  "status": "success",
  "message": "Data deleted successfully."
}
```

- `KEY_NOT_FOUND`: The provided key does not exist in the database.
- `INVALID_TOKEN`: Invalid access token provided
