# Parcelio Backend — AI Coding Instructions

## Project

Parcelio is a parcel-delivery backend.

Current architecture:

```text
app/
├── config/
├── controller/
├── middleware/
├── models/
├── service/
├── storage/
├── utility/
└── validation/
routes/
logs/
app.js
package.json
```

## Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript
- Zod
- JWT
- bcryptjs
- Helmet
- CORS
- express-rate-limit
- Nodemailer
- Pino
- Socket.IO
- express-fileupload
- dotenv
- Yarn

## Golden rules

1. Inspect existing code before editing.
2. Preserve the existing architecture.
3. Prefer the smallest safe change.
4. Use Zod for input validation.
5. Keep routes thin.
6. Keep controllers thin.
7. Put business logic in services.
8. Keep persistence logic in models/storage.
9. Centralize authentication and authorization.
10. Never trust frontend-provided roles, ownership, prices, or sensitive state.
11. Never expose secrets or internal errors.
12. Use centralized error handling.
13. Use pagination for unbounded lists.
14. Use Mongoose indexes based on actual query patterns.
15. Use `.lean()` for suitable read-only queries.
16. Validate file uploads.
17. Do not log passwords, tokens, or authorization headers.
18. Do not add dependencies without checking existing packages.
19. Do not introduce TypeScript unless explicitly requested.
20. Do not rewrite unrelated files.

## Preferred request flow

```text
Route
→ Validation
→ Authentication
→ Authorization
→ Controller
→ Service
→ Model/Storage
→ Response
```

## Code style

Prefer readable JavaScript over clever abstractions.

Use:

- descriptive names;
- early returns;
- small functions;
- reusable middleware;
- consistent API responses;
- centralized constants/config where useful.

Avoid:

- giant controllers;
- duplicated validation;
- repeated JWT logic;
- direct DB queries inside routes;
- unnecessary `try/catch` duplication;
- magic strings;
- speculative abstractions.

## API response

Prefer the existing project's response contract.

If no contract exists:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Errors:

```json
{
  "success": false,
  "message": "Request failed",
  "errors": []
}
```

## Security

Always consider:

- JWT verification
- RBAC
- Zod validation
- Helmet
- CORS
- rate limiting
- password hashing
- safe error handling
- file upload validation
- NoSQL injection
- path traversal
- secret management

## Before finishing a task

Check:

- Is the input validated?
- Is authentication required?
- Is authorization required?
- Can the client manipulate ownership or sensitive values?
- Are database queries bounded and indexed where appropriate?
- Are errors handled?
- Are secrets excluded from logs/responses?
- Did the change preserve existing API behavior?
- Did you verify the code?

Do not say "done" without checking the relevant implementation.
