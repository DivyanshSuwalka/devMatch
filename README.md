# devMatch - Backend

This is the backend server for **devMatch**, a platform designed to connect developers. The server handles user authentication, profile management, and matching logic.

## ✨ Features

-   **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
-   **Profile Management:** Endpoints for creating, updating, and viewing developer profiles.
-   **Developer Matching:** Core logic to suggest potential connections based on skills and interests.
-   **Password Hashing:** Protects user passwords using bcrypt.

## 🚀 Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Token (jsonwebtoken)
-   **Password Hashing:** bcryptjs
-   **Environment Variables:** dotenv

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js, npm, and MongoDB installed on your machine.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/DivyanshSuwalka/devMatch.git](https://github.com/DivyanshSuwalka/devMatch.git)
    ```
2.  Navigate to the project directory
    ```sh
    cd devMatch
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Environment Configuration

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

### Running the Server

-   **Development Mode (with nodemon):**
    ```sh
    npm run server
    ```
-   **Production Mode:**
    ```sh
    npm start
    ```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

## 🔌 API Endpoints

Here are the primary API routes available:

-   `POST /signup`: Register a new user.
-   `POST /login`: login user.
-   `POST /logout`: logout user.

-   `GET /profile/view`: Get the logged-in user's data.
-   `PATCH /profile/edit`: update a user's profile.
-   `PATCH /profile/password`: change the user's password.

-   `POST /request/send/:status/:userId`: send request using user ID =>(Now the request would be ignore or intrested).
-   `POST /request/review/:status/:requestId`: receiver responds to the incoming requests(accepted or rejected).

-   `GET /user/connections`: Get all user connections(friends).
-   `GET /user/request`: All the received requests.
-   `GET /user/feed` - All the users on the platform.


## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
