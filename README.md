# 🎮 Online Video Game Store Backend Server

This repository contains the backend server for an online video game store, built using **Node.js**, **Express**, and **MongoDB**. The backend powers a frontend developed with **Vite** and **React**. The platform offers a seamless gaming shopping experience, featuring live chat functionality, user authentication, and comprehensive game details.

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)

## ✨ Features

- **Game Index**: Browse through a comprehensive list of games with filtering and searching capabilities.
- **Game Details Page**: View detailed information about each game, including reviews and related content.
- **User Authentication**: Secure login and signup functionality.
- **Shopping Cart**: Add games to your cart and proceed to checkout.
- **Live Chat**: Engage in live chat rooms specific to each game using Socket.io.
- **Reviews**: Add and read reviews for each game.
- **Dashboard**: Manage your account and track your activity.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- MongoDB (v4.4 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/online-video-game-store.git
   cd online-video-game-store
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file in the root directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

1. Start the MongoDB server:

   ```bash
   mongod
   ```

2. Run the backend server:

   ```bash
   npm run start
   ```

3. Navigate to the frontend directory and start the frontend server:
   ```bash
   cd client
   npm run dev
   ```

## 📂 Project Structure

```
├── client/               # Frontend code (React + Vite)
├── controllers/          # Express route controllers
├── models/               # Mongoose models
├── routes/               # Express routes
├── sockets/              # Socket.io event handlers
├── middlewares/          # Custom middleware functions
├── utils/                # Utility functions
└── server.js             # Entry point for the backend server
```

## 🛠️ API Endpoints

- **Authentication**
  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Login with existing credentials
- **Games**
  - `GET /api/games` - Retrieve all games
  - `GET /api/games/:id` - Retrieve details for a specific game
- **Reviews**
  - `POST /api/game/:id/review` - Add a review for a game

## 🧰 Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.io
- **Frontend**: React, Vite, MDBReact
- **Authentication**: JWT (JSON Web Tokens)
- **Realtime**: Socket.io

## 🌐 Live Demo

Check out the live version of this project deployed on Render:

[Online Video Game Store](https://gamestore-o1dk.onrender.com/)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
