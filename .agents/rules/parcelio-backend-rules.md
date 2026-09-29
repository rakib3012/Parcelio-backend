---
description: Mandatory rules for all tasks in the Parcelio backend workspace.
globs: ["**/*"]
alwaysApply: true
---

# Parcelio Backend — Agent Rules

## 1. Read Before You Write

Before every task:

1. Read the relevant agent file and skills from `.github/agents/` and `.github/skills/`.
2. Inspect the existing implementation in `app/`, `routes/`, and `app.js`.
3. Reuse established conventions — never invent fields, routes, roles, status values, or workflows that the repository does not already define.

## 2. Architecture

Follow this strict request flow:

```
Route → Validation (Zod) → Authentication → Authorization → Controller → Service → Model/Storage → Response
```

### File placement

| Concern | Location |
|---|---|
| Route definitions | `routes/` |
| Zod schemas | `app/validation/` |
| Auth/authz middleware | `app/middleware/` |
| Request handlers | `app/controller/` |
| Business logic | `app/service/` |
| Mongoose schemas | `app/models/` |
| File storage | `app/storage/` |
| Helpers | `app/utility/` |
| Config/env | `app/config/` |

## 3. Tech Stack — Do Not Deviate

- Node.js, Express 5, JavaScript (not TypeScript)
- MongoDB + Mongoose
- Zod for validation
- JWT (jsonwebtoken) + bcryptjs
- Helmet, CORS, express-rate-limit, hpp
- Pino for logging
- Socket.IO for realtime
- Nodemailer for email
- express-fileupload for uploads
- dotenv for env vars
- Yarn as package manager

Do not add or replace dependencies without explicit justification.

## 4. API Response Contract

```json
{ "success": true, "message": "Success", "data": {} }
{ "success": false, "message": "Error", "errors": [] }
```

## 5. Security Baseline

- Validate all input with Zod — never trust `req.body`, `req.params`, `req.query`.
- Hash passwords with bcryptjs. Never store or return plaintext passwords.
- Use JWT with `Authorization: Bearer <token>`. Verify signatures server-side.
- Enforce RBAC on the backend — never trust client-provided roles, ownership, or prices.
- Use centralized error handling. Never expose stack traces or internal details.
- Never log passwords, JWTs, tokens, or authorization headers.
- Validate file uploads: size, MIME type, generate safe filenames, prevent path traversal.
- Centralize env vars in `app/config/`. Never scatter `process.env.X`.

## 6. Database Rules

- Use `.lean()` for read-only queries.
- Paginate all collection endpoints.
- Add indexes based on actual query patterns.
- Validate ObjectIds before querying.
- Prevent N+1 queries.
- Use transactions only when multiple writes must be atomic.
- Never pass arbitrary client query objects to MongoDB.

## 7. Code Quality

- Simple, readable JavaScript. Descriptive names. Early returns.
- Controllers must be thin — delegate to services.
- Services own business logic, independent from Express.
- Models own schema definitions, not business logic.
- No giant controllers, no duplicate validation, no magic strings.

## 8. Change Protocol

1. **Inspect** — read existing files
2. **Plan** — state what changes and why
3. **Implement** — make focused changes
4. **Verify** — run checks
5. **Review** — security, validation, errors, authorization, DB efficiency, response consistency
