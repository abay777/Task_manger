# Task Manager - Frontend

A modern, responsive React frontend for the Task Manager application built with Vite and Tailwind CSS (v4).

## Features

- **Modern UI/UX**: Clean design with subtle glassmorphism, hover effects, and responsive mobile-first layouts.
- **Task Management**: Create new tasks and progress them through statuses (Open → In Progress → Done).
- **Search & Filtering**: 
  - Instantly search tasks by title with a dedicated visual search bar.
  - Filter tasks by their current status via a custom dropdown.
- **Pagination**: Navigate through larger lists of tasks with built-in Previous/Next controls.
- **Centralized API**: All backend calls are cleanly abstracted away in the `src/services/api.js` module.

## Tech Stack

- **React 19** (via [Vite](https://vite.dev/))
- **Tailwind CSS v4** (Native Vite Plugin)
- **Vanilla CSS** (for global overrides and variables)

## Prerequisites

- Node.js (v18+ recommended)
- A running instance of the backend server (Node + Express)

## Setup Instructions

1. **Install Dependencies**
   Navigate to the `Frontend` directory and run:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the `Frontend` directory based on the provided `.env.example`:
   ```env
   VITE_API_BASE_URL=http://localhost:5320   -> can be any port as you want
   ```
   *Make sure `VITE_API_BASE_URL` points to your running backend server.*

3. **Run the Development Server**
   Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (Vite's default port).

## Architecture & Project Structure

- `src/components/`: Reusable UI components (Header, TaskList, TaskItem, NewTaskForm, Pagination).
- `src/pages/`: Main page containers (e.g., `TasksPage.jsx`) that handle state and data fetching.
- `src/services/api.js`: Centralized module for all `fetch` requests (`GET`, `POST`, `PATCH`) to communicate with the Node backend.
- `src/index.css`: Tailwind configuration and base custom styles.
