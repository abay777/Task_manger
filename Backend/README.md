# Task Manager - Backend

A Node.js and Express backend for the Task Manager application, built with a clean separation of layers (Routes → Controllers → Services → Models) and powered by a SQL database.

## Architecture & Project Structure

The project follows a layered architecture to keep code modular and centralized:

- **`routes/`**: Defines the Express API endpoints and maps them to controllers.
- **`controllers/`**: Handles incoming HTTP requests and responses, passing data to services.
- **`services/`**: Contains the core business logic.
- **`models/`**: Centralized database queries and connection logic.
- **`middlewares/`**: Custom Express middlewares (e.g., authentication, global error handling).

## Prerequisites

- Node.js (v18+ recommended)
- A local SQL Database (PostgreSQL or MySQL)

## Database Setup

This project uses MySQL. Follow these steps to set things up:

1. Log into your local MySQL server.
   ```bash
   mysql -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE task_manager;
   ```
3. Update your `.env` file with your MySQL connection details.
4. Run the migration command to automatically create the `Users` and `Tasks` tables and insert a default user:

```bash
mysql -u root -p task_manager < migrations/001_init.sql
```

## Setup Instructions

1. **Install Dependencies**
   Navigate to the `Backend` directory and install the required NPM packages:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the `Backend` directory based on the `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=task_manager
   DB_PORT=3306
   ```

3. **Start the Development Server**
   Start the server using `npm run dev` (which should run `nodemon` or standard node depending on setup).
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

## Production Deployment (Docker)

To run the application in a production-ready environment using Docker:

1. Build the Docker image:
   ```bash
   docker build -t task_manager_backend .
   ```

2. Run the container (make sure to replace the environment variables to match your DB or use a `.env` file):
   ```bash
   docker run -p 5000:5000 \
     -e DB_HOST=your_db_host \
     -e DB_USER=your_db_user \
     -e DB_PASSWORD=your_db_password \
     -e DB_NAME=task_manager \
     -d task_manager_backend
   ```

   Alternatively, if you use a `.env` file for production variables:
   ```bash
   docker run -p 5000:5000 --env-file .env -d task_manager_backend
   ```

## API Endpoints

All endpoints are prefixed with `/api`. A fake authentication middleware attaches `req.user = { id: 1 }` to every request.

- `GET /api/tasks?status=&q=&limit=10&offset=0` - Get all tasks for the logged-in user with filtering and pagination.
- `POST /api/tasks` - Create a new task (defaults to `status="OPEN"`).
- `PATCH /api/tasks/:id/status` - Update an existing task's status.
