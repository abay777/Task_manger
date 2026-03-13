# Task Manager Application

Welcome to the Task Manager project! This is a full-stack application designed to help you organize, track, and complete your tasks efficiently.

> 🚀 **Live Demo:** You can view the live application here: [https://task-manager-tasks.netlify.app/](https://task-manager-tasks.netlify.app/)

This repository contains both the **Frontend** and the **Backend** codebases in a modular structure.

---

## Project Structure

The application is divided into two main parts. For specific setup instructions, feature lists, and environment configuration, please refer to the dedicated README files for each section:

### 1. [Backend (API & Database)](./Backend/README.md)
The Backend is a clean, scalable Node.js API powered by a PostgreSQL database. It handles all core business logic, data persistence, and provides robust RESTful endpoints.
- **Key Features:** TypeScript support, Zod validation, Docker containerization.

### 2. [Frontend (User Interface)](./Frontend/README.md)
The Frontend is the user-facing web application that communicates with the Backend API, allowing users to effortlessly manage their tasks and notes.
- *Check the Frontend README for specific framework details and local setup.*

---

## CI/CD Pipeline
This project utilizes **GitHub Actions** (found in the `.github` directory) for continuous integration and automated deployment to an AWS EC2 instance, ensuring smooth and reliable delivery of updates.

---

## Getting Started

To run the full stack locally, you will need to start both the Backend and Frontend servers. 

We recommend opening two separate terminal windows. Follow the **"How to Run Locally"** instructions found inside both the `./Backend/README.md` and `./Frontend/README.md` files.
