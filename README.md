# kotiks-web

This repository is a personal project to create my own website. It serves as a testbed for learning React and understanding how to connect a frontend built with React to a backend using FastAPI. The project is structured into two main parts: the **frontend** and the **backend**.

---

## Project Overview

- **Frontend**: Built with React and Vite for fast development and modern tooling.
- **Backend**: Built with FastAPI, a modern Python web framework for building APIs.

This project is a hands-on exploration of how to integrate a React-based frontend with a FastAPI backend.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js** (v16 or later)
- **Python** (v3.9 or later)
- **Poetry** (for Python dependency management)
- **npm** (comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone git@github.com:K0tova/kotiks-web.git
cd kotiks-web
```

### 2. Backend Setup
- Navigate to the backend directory:
     ```bash
     cd backend
     ```
- Install the required dependencies:
     ```bash
     poetry init
     ```

- Install the required dependencies:
     ```bash
     poetry add fastapi uvicorn flask django
     ```

- Run the backend server:
     ```bash
     poetry run uvicorn main:app --reload
     ```
- The backend server will start at `http://127.0.0.1:8000`.

### 3. Frontend Setup

- Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
- Install the required dependencies:
     ```bash
     npm install
     ```

- Add the Vite React plugin:
     ```bash
     npm install @vitejs/plugin-react --save-dev
     ```

- Start the frontend development server:
     ```bash
     npm run dev
     ```
- The frontend server will start at http://127.0.0.1:5173.

### 4. Connecting Frontend and Backend
TBD

## Project Goals
- **Learn React**: Build a modern frontend using React and Vite.
- **Understand Backend Development**: Use FastAPI to create and expose APIs.
- **Integrate Frontend and Backend**: Connect the React frontend to the FastAPI backend for a full-stack experience.

## Licensing

This code is not open-source. Please contact me directly at kotova.od@gmail.com if you'd like to reuse or adapt any part of this project.
