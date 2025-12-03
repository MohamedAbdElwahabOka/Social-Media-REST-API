#!/bin/bash

# 1. Create the README.md file
echo "Creating README.md..."
cat << 'EOF' > README.md
# 🚀 Social Media REST API

A robust backend API for a social media platform built with **Node.js**, **Express**, and **MongoDB**. This project features secure authentication, user management, and social interactions like following and blocking users.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## ✨ Features

- **Authentication & Authorization:**
  - Secure Registration & Login using **JWT** (JSON Web Tokens) and Cookies.
  - Password hashing with **Bcrypt**.
- **User Management:**
  - CRUD operations for User profiles.
  - Profile updates (Bio, Pictures).
- **Social Interactions:**
  - **Follow/Unfollow** system.
  - **Block/Unblock** users mechanism.
  - Retrieve lists of blocked users.
- **Content Management:**
  - Models prepared for Posts, Stories, Comments, and Messages.
- **Documentation:**
  - Integrated **Swagger** for API documentation and testing.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JWT & Bcrypt
- **Documentation:** Swagger UI

## 🗄 Database Schema

The API relies on the following Mongoose models:
- **User:** Stores credentials, profile info, followers, following, and block lists.
- **Post:** Handles user uploads, captions, and likes.
- **Comment:** Manages comments and replies on posts.
- **Story:** Temporary user statuses/images.
- **Conversation & Message:** Handles chat functionality.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js installed on your machine.
- MongoDB connection string (local or Atlas).

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mohamedabdelwahaboka/social-media-rest-api.git](https://github.com/mohamedabdelwahaboka/social-media-rest-api.git)
   cd social-media-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory.

4. **Start the server:**
   ```bash
   npm start
   ```

## 🔐 Environment Variables

Create a `.env` file in the root folder and add the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

## 📖 API Documentation

This project uses **Swagger** to document API endpoints.
Once the server is running, visit:

```
http://localhost:5000/api-docs
```

## 📂 Project Structure

```bash
social-media-rest-api/
├── controllers/    # Logic for handling requests
├── Database/       # Database connection logic
├── middlewares/    # Custom middlewares
├── models/         # Mongoose Schemas
├── routes/         # API Routes definition
├── index.js        # Entry point
└── package.json    # Dependencies and scripts
```

## 👨‍💻 Author

**Mohamed Abdelwahab**
EOF

# 2. Create the .env file (Security Best Practice)
echo "Creating .env file..."
cat << EOF > .env
PORT=5000
MONGO_URI=mongodb+srv://mohamedabdelwahabelazab:V6ioVyLKwhvD03I6@cluster0.culje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=kfidfkalskksdjaisddddfkasdf
EOF

# 3. Create .gitignore (To prevent uploading sensitive files)
echo "Creating .gitignore..."
cat << EOF > .gitignore
node_modules/
.env
.DS_Store
EOF

echo "✅ Success! README.md, .env, and .gitignore have been created."
echo "⚠️  NOTE: I've moved your MongoDB URI and JWT Secret into the .env file."
echo "👉  Please update your code (Database/db.js and controllers/authController.js) to use 'process.env.MONGO_URI' and 'process.env.JWT_SECRET'."
