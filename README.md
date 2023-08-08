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

   ```env
- `DB_HOST`: Hostname of the MySQL database.
- `DB_PORT`: Port number of the MySQL database.
- `DB_NAME`: Name of the MySQL database.
- `DB_USER`: Username for connecting to the MySQL database.
- `DB_PASSWORD`: Password for connecting to the MySQL database.
- `JWT_SECRET_KEY`: Secret key for JWT token generation.
- `PORT`: Port on which the server will run.
   ```

   An example `.env.example` file is provided for reference:

   ```env
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

## API Documentation:
   
1. User Registration
Endpoint: POST /api/register

Allows users to register with the system by providing username, email, password, full name, age, and gender.

2. Generate Token
Endpoint: POST /api/token

Generates an access token for a user based on provided username and password.

3. Store Data
Endpoint: POST /api/data

Stores a key-value pair in the database. Requires authentication using a valid access token.

4. Retrieve Data
Endpoint: GET /api/data/{key}

Retrieves the value associated with a specific key. Requires authentication using a valid access token.

5. Update Data
Endpoint: PUT /api/data/{key}

Updates the value associated with an existing key. Requires authentication using a valid access token.

6. Delete Data
Endpoint: DELETE /api/data/{key}

Deletes a key-value pair from the database. Requires authentication using a valid access token.

