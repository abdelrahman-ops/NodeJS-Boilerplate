# 🚀 Node.js TypeScript Boilerplate

### _A powerful and production-ready Node.js boilerplate built with **TypeScript**, **Express**, and **GraphQL**. It supports both **REST API** and **GraphQL API** modes with a hybrid option. Equipped with **Prisma ORM**, **Mongoose**, **Swagger**, and a clean modular structure._

---

## 📌 Table of Contents

1. [Features](#-features)
2. [Project Structure](#-project-structure)
3. [Prerequisites](#-prerequisites)
4. [Setup Guide](#-setup-guide)
5. [Environment Variables](#-environment-variables)
6. [Running the App](#-running-the-app)
7. [API Documentation](#-api-documentation)
8. [Testing](#-testing)
9. [Deployment](#-deployment)
10. [FAQ](#-faq)

---

## ✨ Features

✅ Hybrid API Support (REST + GraphQL)  
✅ JWT Authentication with refresh tokens  
✅ MongoDB + Mongoose integration 
✅ Prisma ORM (for SQL support)
✅ TypeScript out of the box  
✅ Modular folder structure
✅ Swagger UI for REST API docs    
✅ Pre-configured ESLint, Prettier, and Jest
✅ Environment config & security setup
✅ Centralized error handling & middlewares

---

## 📂 Project Structure

```bash
boilerplate/
├── src/
│   ├── api/          # API layer: REST controllers and GraphQL resolvers
│   ├── config/       # App configuration (DB, auth, etc.)
│   ├── controllers/  # Route handlers (MVC pattern)
│   ├── middleware/   # Custom Express middleware
│   ├── models/       # Database models
│   ├── services/     # Business logic layer
│   ├── types/        # TypeScript interfaces/types
│   ├── utils/        # Utility functions (logging, helpers)
│   ├── app.ts        # Express app setup
│   └── server.ts     # Entry point
├── docs/             # Documentation
├── prisma/           # Prisma schema (if using SQL)
├── scripts/          # Automation scripts
├── tests/            # Unit + integration tests
├── .env.example      # Environment variables template
└── package.json      # Dependencies + scripts
```

---

## ⚙️ Prerequisites

- Node.js v18+
- MongoDB v6+ (or PostgreSQL for Prisma)
- Git

---

## 🛠️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nodejs-boilerplate.git
cd nodejs-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
MONGODB_URI=mongodb://localhost:27017/boilerplate
JWT_SECRET=your_jwt_secret_here
API_MODE=rest
```

### 4. Database Setup

For MongoDB:  
Ensure MongoDB is running locally or update `.env` with a remote URI.

For PostgreSQL (Prisma):

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

- Runs with `nodemon` (auto-restarts on changes).
- Access: `http://localhost:5000`

### Production Build

```bash
npm run build  # Compiles TypeScript
npm start      # Starts the server
```

---

## 📚 API Documentation

Swagger UI is auto-generated at:  
🔗 `http://localhost:5000/api-docs`

Current Implemented Endpoints:

- `POST /auth/register` – User registration
- `POST /auth/login` – User login
- `GET /user/profile` – Protected route (JWT required)

---

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:cov
```

---

## ☁️ Deployment

### Option 1: PM2 (Recommended for VPS)

```bash
npm install -g pm2
pm2 start dist/server.js --name "boilerplate"
pm2 save
pm2 startup
```

### Option 2: Railway/Heroku

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

---

## ❓ FAQ

### Q: How do I switch between REST and GraphQL?

A: Toggle API_MODE` in `.env`.

### Q: How do I reset the database?

A: For MongoDB:

```bash
mongo boilerplate --eval "db.dropDatabase()"
```

### Q: How to contribute?

1. Fork the repo
2. Create a branch (`git checkout -b feature/awesome-feature`)
3. Submit a PR!

---

## 📜 License

MIT © [Abdelrahman Ataa](https://github.com/abdelrahman-ops)

---

## 💡 Pro Tips

- Use `npm run lint` to check code style.
- Use `npm run format` to auto-format code.
- GraphQL Playground: `http://localhost:5000/graphql`

Happy Coding! 🎉

---

### 🔗 Links

- [Report an Issue](https://github.com/abdelrahman-ops/nodejs-boilerplate/issues)
- [Changelog](CHANGELOG.md)

---
