# Shopping List API

Welcome to the Shopping List API documentation. This API allows you to manage your shopping list and user profiles. You can use it to create, read, update, and delete items on your shopping list, as well as manage your user account.
**Access the live API:** [Shopping List API on Heroku](https://shoppinglist-sringtho-011a8244b601.herokuapp.com)

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Shopping List API provides a convenient way to manage your shopping list and user account. Whether you want to add new items to your list, mark items as purchased, or update your user profile, this API has you covered.

## Getting Started

Before you can start using the Shopping List API, you need to set up your environment and configure the necessary parameters. Here's how to get started:

## Installation

To use the Shopping List API, you need to install the required dependencies. Start by cloning the repository and installing the necessary packages:

```bash
git clone https://github.com/ringtho/list-node.git
cd list-node
npm install
```

## Configuration

The API relies on configuration files and environment variables to operate. You'll need to set up these configurations before using the API:

- **MongoDB**: Create a MongoDB database and provide the connection string in an environment variable (`MONGO_URI`).

- **JWT Secret**: Generate a secret key for JSON Web Tokens and store it in an environment variable (`JWT_SECRET`).

## Usage

The Shopping List API offers a range of endpoints to interact with the system. To make requests to these endpoints, you need to understand the API's authentication mechanism.

### API Endpoints

Here are the core API endpoints you can use:

- **/auth/login**: Log in to your account and receive an access token.
- **/auth/signup**: Register a new user account.
- **/auth/profile**: Retrieve or update user details.
- **/items**: Manage your shopping list items, including listing, creating, and updating.
- **/items/{id}**: View, update, or delete a specific item by its ID.

### Authentication

The API uses JSON Web Tokens (JWT) for authentication. To access protected routes, you need to include a valid JWT in the Authorization header.

#### Example:

```http
GET /api/v1/auth/profile
Authorization: Bearer your-jwt-token
```
#### Examples
Here are some examples of how to use the API:

##### Register a new user
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "your-password"
}
```
##### Get user profile
```http
GET /api/v1/auth/profile
Authorization: Bearer your-jwt-token
```
## Contributing
We welcome contributions from the community. If you'd like to improve the API, fix issues, or add new features, please fork the repository, create a branch, and open a pull request.

## License
This project is licensed under the MIT License.
