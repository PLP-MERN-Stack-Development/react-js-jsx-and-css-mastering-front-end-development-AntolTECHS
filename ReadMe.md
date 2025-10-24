# 📰 MERN Blog App

A **full-stack blogging platform** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
Users can **register**, **log in**, **create posts** with images, **categorize content**, and **comment** on posts — all through an elegant and responsive UI.

---

## 🚀 Project Overview

The **MERN Blog App** is a modern web application designed for content creation and engagement.  
It provides a seamless experience for authors and readers alike, combining a RESTful API backend with a clean and interactive React frontend.

### 🧩 Tech Stack
- **Frontend:** React.js + Context API + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Uploads:** Multer + Local Storage
- **API Testing:** Postman

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone git@github.com:AntolTECHS/Mern_Blog-app.git
cd Mern_Blog-app


2️⃣ Setup the Server (Backend)
cd server
npm install

Create a .env file in /server:
PORT=5000
MONGO_URI=mongodb://localhost:27017/mernblog
JWT_SECRET=your_jwt_secret

Start the backend server:
npm run dev

Server runs on http://localhost:5000

3️⃣ Setup the Client (Frontend)
cd ../client
npm install
npm run dev

Frontend runs on http://localhost:5173

🧩 Folder Structure

Mern_Blog-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI components (PostCard, etc.)
│   │   ├── contexts/       # Auth & Posts Context
│   │   ├── pages/          # Routes (Home, Create, Edit, etc.)
│   │   ├── services/       # API service (axios)
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/             # DB config
│   ├── controllers/        # API logic
│   ├── middleware/         # Auth & Error handling
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routers
│   ├── uploads/            # Image uploads
│   └── server.js
│
└── README.md


## 🖼 Screenshots

**🏠 Home Page**  
![Home page](./client/screenshots/Home.png)

**✏️ Update Page**  
![Update page](./client/screenshots/Update.png)

**💬 Comments Section**  
![Comments](./client/screenshots/Comments.png)

🧑‍💻 Developer Notes

Make sure MongoDB is running locally:
sudo systemctl start mongod

Uploaded images are stored in the /uploads folder in the backend.
You can use Postman to test the API endpoints.


🧾 License
This project is open source and available under the MIT License

🤝 Author
👤 AntolTECHS

