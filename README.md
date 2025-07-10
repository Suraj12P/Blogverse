# Blogverse

A full-stack blog platform where users can sign up, log in, and publish blogs with images. Built with **MERN Stack** and deployed on **Render** (backend) & **Vercel** (frontend).

## 🧰 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB,
- **Deployment**: Vercel (frontend), Render (backend)
- **Authentication**: JWT with secure cookies

## 🔐 Features

- JWT-based user authentication
- Create, edit, delete blog posts
- Upload & display blog images
- Responsive UI with React Router


## ⚙️ Run Locally

### 🖥 Backend Setup

```bash
cd backend
npm install
```
### Create a .env file and add the following:
```bash
 MONGODB_URL=<your-mongo-uri>

 JWT_SECRET=<your-secret>
``` 
```bash
node index.js
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev ```
