# Task Manager - Backend

A clean, simplistic, and scalable Node.js backend for the Task Manager application.

## Table of Contents
- [How to Run Locally](#how-to-run-locally)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

---

## How to Run Locally

Follow these steps to get the backend up and running on your local machine.

### 1. Prerequisites
- **Node.js**: Make sure you have Node.js (v18+ recommended) installed.
- **PostgreSQL**: A local or remote PostgreSQL database instance.

### 2. Clone and Install dependencies
Clone the repository, navigate to the `Backend` directory, and install the required NPM packages:
```bash
git clone <your-repo-url>
cd Backend
npm install
```

### 3. Environment Setup
Create a `.env` file in the root of the `Backend` folder. You will need to provide your PostgreSQL connection string here. (See [Environment Variables](#environment-variables) for a detailed explanation).

### 4. Start the Server
Start the development server:
```bash
npm run dev
```
The API will be accessible at `http://localhost:4000`.

---

## Features

- **Scalable Architecture**: Built with a clean separation of concerns (Routes → Controllers → Services → Models) to handle growth smoothly and effectively.
- **Proper Validation (Zod)**: Utilizes Zod for robust schema validation, ensuring data integrity and reliable API requests.
- **TypeScript for Type Safety**: Developed with TypeScript to enforce end-to-end type safety, reducing runtime errors and improving the developer experience.
- **Docker Containerization**: Containerized using Docker for consistent local development and production deployments.
- **CI/CD Pipeline**: Automated workflows using GitHub Actions for testing and seamless deployment to an AWS EC2 instance.
- **Simplistic Design**: Focused on being developer-friendly, maintainable, and avoiding unnecessary complexity.

---

## Environment Variables

To properly connect the application to your PostgreSQL database, your `.env` file must include the following variables:

```env
# Server Configuration
PORT=4000

# PostgreSQL Connection String
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager?schema=public"
```

**Explanation**: 
- `PORT`: The port on which your backend server will run. (preffered 4000)
- `DATABASE_URL`: Your PostgreSQL connection string. (e.g., `postgresql://admin:supersecret@localhost:5432/task_db`)

---

## API Endpoints

All endpoints are prefixed with `/api`. 

- `GET /api/tasks` - Gather all tasks (supports query parameters like `status`, `q`, `limit`, `offset`).
- `POST /api/tasks` - Create a new task.
- `PATCH /api/tasks/:id/status` - Update the status of an existing task.
