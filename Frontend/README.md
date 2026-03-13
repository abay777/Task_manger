# Task Manager - Frontend

A simple, responsive React frontend for the Task Manager application, built with Vite and Tailwind CSS.

## Quick Start (Local Setup)

To get the frontend running locally, follow these 3 steps:

**1. Install Dependencies**
Open your terminal in the `Frontend` directory and run:
```bash
npm install
```

**2. Configure Environment**
Create a new file named `.env` in the root of the `Frontend` folder. Add the following line to tell your frontend where to find the backend API:
```env
VITE_API_BASE_URL=http://localhost:4000
```
*(Make sure the port matches where your backend server is actually running).*

**3. Start the App**
Start the development server:
```bash
npm run dev
```
You can now view the app in your browser at `http://localhost:5173`.

---

### Key Features
- Clean UI with mobile-first responsive layouts
- Create tasks and move them through statuses (Open, In Progress, Done)
- Real-time search and filtering
- Built-in pagination handled by the server
