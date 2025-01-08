# API Documentation

## Overview

This document outlines the API endpoints available in the Second Brain application. All API routes are prefixed with `/api`.

## Authentication

Most endpoints require authentication using JWT (JSON Web Token).

### Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### POST /api/auth/login

Authenticate a user and receive a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/register

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "timeZone": "America/New_York"
}
```

### Users

#### GET /api/users/me

Get current user's profile.

**Response:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "timeZone": "America/New_York",
  "role": {
    "id": 1,
    "name": "user"
  }
}
```

### Roles and Permissions

#### GET /api/roles

Get all available roles (requires admin permission).

**Response:**

```json
{
  "roles": [
    {
      "id": 1,
      "name": "admin",
      "permissions": ["create_user", "delete_user", "..."]
    },
    {
      "id": 2,
      "name": "user",
      "permissions": ["create_note", "edit_note", "..."]
    }
  ]
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional additional information
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication required or failed
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Rate limit headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## API Versioning

- Current version: v1
- Version is included in the URL: `/api/v1/...`
- Breaking changes will result in a new version

## Development and Testing

- Base URL for development: `http://localhost:3000/api`
- Test environment: `http://staging-api.example.com/api`
- Production: `https://api.example.com/api`

## Notes

- All timestamps are in ISO 8601 format
- All IDs are UUIDs unless specified otherwise
- Responses are always in JSON format
- Request body should be JSON with Content-Type: application/json
