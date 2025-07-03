# 🧩 Developer Task Management Backend

This is a Node.js + TypeScript backend for managing developers and their tasks. It includes modular architecture with separate layers for services, controllers, repositories, and utilities.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Sequelize ORM**
- **JWT Authentication**
- **Joi for validation**

---

## 📁 Folder Structure

```
.
├── src/
│   ├── common/            # Shared utilities and constants
│   ├── config/            # Environment and database configs
│   ├── controllers/       # Route handlers
│   ├── repositories/      # DB interaction logic
│   ├── services/          # Business logic layer
│   ├── middlewares/       # Middleware (e.g., auth, error handling)
│   └── index.ts           # App entry point
├── .development.env       # Development environment variables
├── .production.env        # Production environment variables
├── package.json
├── tsconfig.json
```

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# 2. Change directory
cd your-repo-name

# 3. Install dependencies
npm install

# 4. Setup your environment variables
cp .development.env .env
```

---

## 🧪 Environment Variables

Create a `.env` file in the root by copying `.development.env` or `.production.env`.

Here's an example of what you may need to configure:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
```

---

## 🧾 Useful GitHub Commands

```bash
# Initialize a new Git repo
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote origin
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to GitHub
git push -u origin main
```

---

## 🚀 Running the Project

```bash
# Development mode with ts-node
npm run dev

# Production build
npm run build
npm start
```

---

## 🛡️ API Endpoints Summary

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/user/register`   | Register a new user      |
| POST   | `/api/user/login`      | Authenticate user        |
| GET    | `/api/task`            | Get list of tasks        |
| POST   | `/api/task`            | Create a task            |
| PUT    | `/api/task/:id`        | Update a task            |
| DELETE | `/api/task/:id`        | Delete a task            |

> Full API documentation can be generated with Swagger or Postman if required.

---

## 👨‍💻 Developer Notes

- Use **Joi** for request validation
- Use **middleware** for authentication & error handling
- Modular services & repositories keep business logic and DB logic cleanly separated
- Logging is handled via custom logger utility

---

## 📦 Scripts (package.json)

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## 📬 Contributing

Feel free to submit issues and pull requests. Make sure to follow the contribution guidelines and maintain code formatting and modular design.

---

## 📄 License

This project is open-sourced under the MIT License.
