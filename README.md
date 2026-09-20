# DevMentor-AI
AI-powered coding mentor for project-based learning, debugging, and interview preparation.

A scalable, production-ready, and well-organized full-stack JavaScript application framework.

## Project Structure

This project is set up as an npm monorepo workspace:

- `frontend/`: React + Vite frontend application.
- `backend/`: Node.js + Express backend service.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (v7 or higher for workspace support)

### Installation

From the root directory, run:

```bash
npm install
```

This will automatically install dependencies for both the frontend and backend workspaces.

### Development

To start both the client and server concurrently in development mode:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## Architecture Guidelines

- **Scalability**: Separate concerns between client logic and API services.
- **Production-Ready**: Setup includes centralized config parsing, structured error-handling, CORS, logging, and environment variable validation.
