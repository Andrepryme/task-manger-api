# Task Manager API

A secure, RESTful Task Manager API built with Node.js, Express, and PostgreSQL.  
It supports user authentication, task CRUD operations, pagination, and ownership-based access control.

---

## 🚀 Features

- User authentication using JWT
- Create, read, update, and delete tasks
- Tasks scoped to authenticated users
- Pagination support for task listings
- PostgreSQL database with migrations
- Secure SQL queries using parameterized statements

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens)
- **Migration:** Custom SQL migration runner
- **Logging:** Custom logger utility

---

## 📦 Installation

### 1. Clone the repository
git clone https://github.com/andrepryme/task-manager-api.git

cd task-manager-api

### 2. Install dependencies
npm install

### 3. Environment variables
**Create a .env file:**

PORT=3000

JWT_SECRET=mysecretkey

DB_HOST=localhost

DB_PORT=5432

DB_NAME=task_manager_db

DB_USER=task_manager_user

DB_PASSWORD=taskmanagerpass432



## Database Setup
- Create PostgreSQL database and user

- Grant permissions

**- Run migrations**

node db/runMigrations.js

## ▶️ Run the Server
npm start

Server runs on:

http://localhost:3000

## 🔐 Authentication
All task routes are protected.

Send JWT token in headers:

Authorization: Bearer < token >

## 📌 API Endpoints
**Create Task**

POST /tasks

**Get Tasks (Paginated)**

GET /tasks?limit=10&offset=0

**Get Task by ID**

GET /tasks/:id

**Update Task**

PATCH /tasks/:id

**Delete Task**

DELETE /tasks/:id
## 📄 Pagination
- limit (default: 10, max: 50)

- offset (default: 0)

**Example:**

GET /tasks?limit=5&offset=10

## 🔒 Security
- Users can only access their own tasks

- SQL injection prevention via parameterized queries

- Auth middleware applied globally to task routes

## 📌 Status

- ✅ Version 1.0.0

- ✅ Production-ready core features

- 🔒 Feature-locked (maintenance mode)

## 👨‍💻 Author
Built as a backend portfolio project to demonstrate real-world API design, database modeling, and security practices.