# Blogverse

Blogverse is a full-stack blogging platform where users can sign up, log in securely, and create rich blog posts with cover images. Users can edit or delete their posts, and the platform ensures only authenticated users can manage their own content.It provides a modern, responsive frontend experience powered by React + Vite and styled with Tailwind CSS, while the backend handles API routes, image uploads, and authentication via JWT tokens.

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
npm run dev 
