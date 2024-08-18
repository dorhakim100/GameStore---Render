🎮 Online Video Game Store Backend Server
This repository contains the backend server for an online video game store, built using Node.js, Express, and MongoDB. The backend powers a frontend developed with Vite and React. The platform offers a seamless gaming shopping experience, featuring live chat functionality, user authentication, and comprehensive game details.

📋 Table of Contents
Features
Getting Started
Prerequisites
Installation
Running the Application
Project Structure
API Endpoints
Technologies Used
Contributing
License
✨ Features
Game Index: Browse through a comprehensive list of games with filtering and searching capabilities.
Game Details Page: View detailed information about each game, including reviews and related content.
User Authentication: Secure login and signup functionality.
Shopping Cart: Add games to your cart and proceed to checkout.
Live Chat: Engage in live chat rooms specific to each game using Socket.io.
Reviews: Add and read reviews for each game.
Dashboard: Manage your account and track your activity.
🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v14 or above)
MongoDB (v4.4 or above)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/online-video-game-store.git
cd online-video-game-store
Install the dependencies:

bash
Copy code
npm install
Set up your environment variables by creating a .env file in the root directory:

makefile
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Running the Application
Start the MongoDB server:

bash
Copy code
mongod
Run the backend server:

bash
Copy code
npm run start
Navigate to the frontend directory and start the frontend server:

bash
Copy code
cd client
npm run dev
📂 Project Structure
bash
Copy code
├── client/               # Frontend code (React + Vite)
├── controllers/          # Express route controllers
├── models/               # Mongoose models
├── routes/               # Express routes
├── sockets/              # Socket.io event handlers
├── middlewares/          # Custom middleware functions
├── utils/                # Utility functions
└── server.js             # Entry point for the backend server
🛠️ API Endpoints
Authentication
POST /api/auth/signup - Register a new user
POST /api/auth/login - Login with existing credentials
Games
GET /api/games - Retrieve all games
GET /api/games/:id - Retrieve details for a specific game
Reviews
POST /api/games/:id/reviews - Add a review for a game
Chat
GET /api/games/:id/chat - Access the chat room for a specific game
🧰 Technologies Used
Backend: Node.js, Express, MongoDB, Mongoose, Socket.io
Frontend: React, Vite, MDBReact
Authentication: JWT (JSON Web Tokens)
Realtime: Socket.io
🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

📝 License
This project is licensed under the MIT License. See the LICENSE file for details.
