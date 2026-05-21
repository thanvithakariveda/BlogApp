#  Blog App — Capstone Project

A full-stack Blog Application built using the MERN Stack (MongoDB, Express, React, Node.js).  
It allows users to register, login, and perform CRUD operations on blog posts with secure authentication.

---

##  Features

###  User Features
-  User Registration & Login (JWT Authentication)
-  Create blog posts
-  View all blogs & single blog
-  Edit & delete own posts
-  Search blogs by title
-  User profile support

###  Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes (frontend + backend)

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS / Tailwind (optional)

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

### Database
- MongoDB
- Mongoose

---

##  Project Structure

blog-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.js
│   │   ├── index.js
│
├── README.md

---

##  Installation & Setup Guide

### 1️⃣ Clone Repository

git clone https://github.com/your-username/blog-app.git
cd blog-app

---

### 2️⃣ Backend Setup

cd backend
npm install

Create `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start

Backend runs at:
http://localhost:5000

---

### 3️⃣ Frontend Setup

cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

---

##  API Endpoints

### Authentication

| Method | Endpoint            | Description    |
|--------|-------------------|----------------|
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login user     |

---

### Blog Routes

| Method | Endpoint        | Description     |
|--------|----------------|-----------------|
| GET    | /api/posts     | Get all posts   |
| GET    | /api/posts/:id | Get single post |
| POST   | /api/posts     | Create post     |
| PUT    | /api/posts/:id | Update post     |
| DELETE | /api/posts/:id | Delete post     |

---

##  Sample API Request

POST /api/posts

{
  "title": "My First Blog",
  "content": "This is my blog content",
  "author": "userId"
}

---

##  Authentication Flow

- User registers
- Password is hashed using bcrypt
- Login returns JWT token
- Token stored in localStorage
- Token used for protected routes

---

##  Key Learnings

- MERN stack architecture
- REST API development
- JWT authentication system
- MongoDB schema design
- React state management
- Protected routes implementation

---

##  Future Enhancements

-  Comment system
-  Like & reaction system
-  Image upload (Cloudinary)
-  Notifications system
-  Mobile responsive UI improvements
-  Deployment (Vercel + Render + MongoDB Atlas)

---

##  Author



---

##  License

This project is licensed under the MIT License.

---
