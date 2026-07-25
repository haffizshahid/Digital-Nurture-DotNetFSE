# Expected API Execution Outputs

This document details the request and response outputs for the JWT Authentication pipeline in this exercise.

---

## 🔑 1. User Login & Token Generation

*   **Endpoint**: `POST /api/Auth/login`
*   **Request Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "password123"
    }
    ```

### Successful Response:
*   **HTTP Status**: `200 OK`
*   **Response Body**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJuYmYiOjE3NjIyMzUwMDAsImV4cCI6MTc2MjIzODYwMCwiaXNzIjoiTXlBdXRoU2VydmVyIiwiYXVkIjoiTXlBcGlVc2VycyJ9.xxxx-signature-xxxx"
    }
    ```

### Unsuccessful Response (Invalid credentials):
*   **Request Body**:
    ```json
    {
      "username": "wronguser",
      "password": "wrongpassword"
    }
    ```
*   **HTTP Status**: `401 Unauthorized`

---

## 🔒 2. Requesting Secured Endpoint (`GET /api/Secured`)

This controller has the `[Authorize]` attribute to enforce authentication validation.

### Case A: Request without Authorization Header
*   **Endpoint**: `GET /api/Secured`
*   **HTTP Status**: `401 Unauthorized`
*   **Headers Returned**: `WWW-Authenticate: Bearer`

---

### Case B: Request with Valid JWT Token
*   **Endpoint**: `GET /api/Secured`
*   **Request Headers**: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
*   **HTTP Status**: `200 OK`
*   **Response Body**:
    ```json
    {
      "message": "Access granted to secured endpoint using JWT token!"
    }
    ```
