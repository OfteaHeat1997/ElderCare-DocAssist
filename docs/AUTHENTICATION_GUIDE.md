# Authentication Integration Guide for Tim

This guide explains how to connect the frontend login system to your Java backend authentication.

## Current Frontend Setup

The login system is ready and working with demo accounts. You just need to replace the demo authentication with real API calls.

### Files Overview

```
frontend/
├── app/
│   ├── login.js          # Login screen UI (email + password form)
│   └── index.js          # Home screen (redirects if not logged in)
├── context/
│   └── AuthContext.js    # Authentication logic (MODIFY THIS FILE)
```

## How to Connect Your Java Backend

### Step 1: Create Authentication Endpoints in Java

Create these REST endpoints in your Spring Boot backend:

```java
// POST /api/auth/login
// Request body: { "email": "nurse@eldercare.nl", "password": "secret123" }
// Response (success): { "success": true, "user": { "id": 1, "name": "Maria", "email": "...", "role": "nurse" }, "token": "jwt-token-here" }
// Response (error): { "success": false, "error": "Invalid credentials" }

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validate credentials against database
        // Return user info + JWT token if valid
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        // Invalidate token if needed
    }
}
```

### Step 2: Update Frontend AuthContext

Open `frontend/context/AuthContext.js` and replace the demo login with API calls:

```javascript
import { createContext, useContext, useState } from "react";

// Your Java backend URL
const API_URL = "http://YOUR_BACKEND_IP:8080/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Login with email + password - calls your Java backend
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Kan niet verbinden met server" };
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

### Step 3: Update Login Screen for Async

Open `frontend/app/login.js` and make `handleLogin` async:

```javascript
const handleLogin = async () => {
  if (!email.trim()) {
    setError("Voer uw e-mailadres in");
    return;
  }
  if (!password.trim()) {
    setError("Voer uw wachtwoord in");
    return;
  }

  // Show loading state (optional)
  setError("");

  const result = await login(email.trim().toLowerCase(), password);
  if (result.success) {
    router.replace("/");
  } else {
    setError(result.error);
  }
};
```

## API Response Format

Your Java backend should return JSON in this format:

### Login Success
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Maria de Vries",
    "email": "maria@eldercare.nl",
    "role": "nurse"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login Error
```json
{
  "success": false,
  "error": "Ongeldig e-mailadres of wachtwoord"
}
```

## Database Schema Suggestion

```sql
CREATE TABLE nurses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'nurse',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example data
INSERT INTO nurses (email, password_hash, name, role) VALUES
('maria@eldercare.nl', '$2a$10$...hashed...', 'Maria de Vries', 'nurse'),
('jan@eldercare.nl', '$2a$10$...hashed...', 'Jan Bakker', 'nurse'),
('admin@eldercare.nl', '$2a$10$...hashed...', 'Administrator', 'admin');
```

## Using the Token for Other API Calls

After login, use the token for authenticated requests:

```javascript
// In any component that needs authenticated API calls
import { useAuth } from "../context/AuthContext";

function SomeComponent() {
  const { token } = useAuth();

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/patients`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // ...
  };
}
```

## Testing

### Current Demo Accounts (before your backend is ready)
- `maria@eldercare.nl` / `wachtwoord123`
- `jan@eldercare.nl` / `wachtwoord123`
- `admin@eldercare.nl` / `admin123`

### After Backend Integration
1. Start your Java backend
2. Update `API_URL` in AuthContext.js to your backend IP
3. Create nurse accounts in your database
4. Test login with real credentials

## CORS Configuration

Make sure your Java backend allows requests from the Expo app:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("*")  // Or specific Expo URL
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*");
    }
}
```

## Questions?

Contact the frontend team if you need:
- Different response format
- Additional user fields
- Help with testing

---
Last updated: 2025-11-27
