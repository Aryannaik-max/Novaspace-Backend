# NovaSpace — Backend

> REST API powering NovaSpace — a real-time collaborative workspace platform. Handles authentication, workspace management, file uploads, task management, and real-time collaboration via Liveblocks.

🔗 **Frontend Repo:** [link-to-frontend-repo](https://github.com/Aryannaik-max/Novaspace) 
🔗 **Live App:** [novaspace-seven.vercel.app](https://novaspace-seven.vercel.app)

---

## Features

- **JWT Authentication** — Secure signup/login with bcrypt password hashing
- **Workspace API** — Create, join (via invite codes), and manage workspaces
- **File Uploads** — Multer-based uploads stored on AWS S3 and Cloudinary
- **Task Management** — CRUD endpoints for kanban board tasks
- **Liveblocks Integration** — Server-side auth for real-time collaborative sessions
- **MySQL + Sequelize** — Relational data modeling with ORM

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Express.js | REST API framework |
| MySQL | Relational database |
| Sequelize | ORM & migrations |
| Liveblocks | Real-time collaboration backend |
| Cloudinary | Image & file storage |
| JWT | Authentication tokens |
| Bcrypt | Password hashing |
| Multer | File upload middleware |

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL database

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/novaspace-backend.git
cd novaspace-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx sequelize-cli db:migrate
```

### Environment Variables

```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=novaspace_db

# Auth
JWT_SECRET=your_jwt_secret

# Liveblocks
LIVEBLOCK_API_KEY=your_liveblocks_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Run Locally

```bash
# Development
npm run dev

# Production
npm start
```

API will run at `http://localhost:5000`

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/workspaces` | Get user's workspaces |
| POST | `/api/workspaces` | Create a workspace |
| POST | `/api/workspaces/join` | Join via invite code |
| GET | `/api/tasks/:workspaceId` | Get tasks for workspace |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update task status |
| POST | `/api/files/upload` | Upload a file |
| POST | `/api/liveblocks/auth` | Liveblocks auth endpoint |

---

## Project Structure

```
src/
├── config/           # DB, Cloudinary, AWS S3 configuration
├── controllers/      # Request handlers (thin layer, delegates to services)
├── middlewares/      # Auth guards, file upload (Multer), error handling
├── migrations/       # Sequelize DB migrations
├── models/           # Sequelize model definitions
├── repositories/     # Data access layer (DB queries abstracted here)
├── routes/           # Express route definitions
├── services/         # Business logic layer
├── utils/            # Helper functions and utilities
└── index.js          # Server entry point
```

> Follows a layered architecture: `Routes → Controllers → Services → Repositories → Models`

---

## Related

- [NovaSpace Frontend](https://github.com/Aryannaik-max/Novaspace) — React app deployed on Vercel
