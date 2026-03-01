# 🔐 PrivyNote – Secure Personal Diary Web Application  

PrivyNote is a modern, full-stack, secure personal diary application that allows users to write, edit, delete, and manage private diary entries online.  
Each user has a completely private space secured with JWT authentication and password encryption.

---

## 🚀 Project Overview

PrivyNote allows users to:

- Register and log in securely  
- Create, edit, delete, and manage diary entries  
- Auto-save notes while typing  
- Search through personal entries  
- Reset forgotten passwords via email  
- Access their diary from any device  

The application follows modern security and full-stack development best practices.

---

## 🏗️ Tech Stack

Frontend:
- React (Vite)

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JWT (JSON Web Token)
- bcrypt (Password Hashing)

Email Service:
- SendGrid (for password reset)

Deployment:
- Vercel (Frontend)
- Render (Backend)

Version Control:
- GitHub

---

## ✨ Features

### 🔑 Authentication & Security
- User Registration
- Secure Login
- JWT-based Authentication
- Password Reset via Email
- Protected Routes
- Encrypted Password Storage

### 📝 Diary Management
- Create Diary Entries
- Edit Entries
- Delete Entries
- Auto-save while typing
- Search functionality
- Private user-specific notes

### 📱 UI & Experience
- Fully Responsive Design
- Clean & Modern Interface
- Mobile-Friendly Layout
- Minimal Writing Environment

---

## 📂 Project Folder Structure

```
privyNote/
│
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nikku1229/privyNote.git
cd privyNote
```

---

### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `client` and `server` folder and add:

client
``` 
VITE_BACKEND_LOCAL_URL=your_backend_api_key
```

server
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_verified_email
CLIENT_URL=your_frontend_url
```

---

## ▶️ Run Locally

### Start Backend

```bash
cd server
npm start
```

Backend runs on:
```
http://localhost:5000
```

---

### Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 📧 Password Reset Flow

1. User clicks **Forgot Password**
2. Enters registered email
3. Backend generates secure reset token
4. SendGrid sends reset link
5. User resets password
6. Password updates securely in database

---

## 🌍 Deployment Guide

### 🖥️ Deploy Frontend (Vercel)

1. Push code to GitHub
2. Go to Vercel
3. Import repository
4. Select `client` folder as root
5. Add environment variables
6. Deploy

---

### 🛠️ Deploy Backend (Render)

1. Go to Render
2. Create New Web Service
3. Connect GitHub repository
4. Select `server` folder as root
5. Add environment variables
6. Deploy

---

## 🔒 Security Practices Used

- JWT Authentication
- Password and diary data Hashing with bcrypt
- Token-based Password Reset
- Environment Variable Protection
- CORS Configuration

---

## 📌 Usage

### For Users

- Register an account
- Login securely
- Create private diary entries
- Edit or delete anytime
- Search past notes
- Reset password if forgotten

---

### For Developers

PrivyNote helps you understand:

- Full-stack MERN development
- Authentication implementation
- Email integration (SendGrid)
- Deployment on Vercel & Render
- REST API structure

---

## 📈 Future Improvements

- Rich Text Editor
- Tags & Categories
- Two-Factor Authentication
- Export Notes as PDF
- Cloud Backup

---

## 👤 Author

Nitish Sharma

---

⭐ If you like this project, give it a star on GitHub!