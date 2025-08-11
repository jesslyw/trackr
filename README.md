# Trackr

A simple full-stack app with PostgreSQL, Spring Boot, and React

Track and manage entries in a list

## Development Setup

**Prerequisite:** Docker

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

## Development Notes

Backend runs at: http://localhost:8080

Frontend runs at: http://localhost:3000

To keep the code easy to maintain and secure, this project avoids external libraries unless really needed and will be gradually refactored to follow this

### API Endpoints

`GET /api/v1/entry` – fetch all entries

`POST /api/v1/entry` – create a new entry

`PUT /api/v1/entry/{id}` – update an existing entry

`DELETE /api/v1/entry/{id}` – delete an entry
