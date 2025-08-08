# Trackr

A simple full-stack app with PostgreSQL, Spring Boot, and React

Track and manage entries in a list

## Development Setup

### 1. Create a `.env` file in the project root with the following contents:

```env
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
```

### 2. Run the App with Docker Compose

From the project root:

```
docker compose up --build
```

This will:

- Start the PostgreSQL database
- Build and start the Spring Boot API
- Build and start the React frontend
