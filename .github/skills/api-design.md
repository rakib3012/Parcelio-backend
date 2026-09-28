# API Design Skill

Use this skill whenever creating or modifying Parcelio HTTP APIs.

## Rules

- Follow REST semantics.
- Use existing `/api/...` conventions.
- Keep route handlers declarative.
- Validate body, params and query with Zod.
- Authenticate protected resources.
- Authorize based on server-side identity and roles.
- Use correct HTTP status codes.
- Keep response shapes consistent.
- Support pagination for collection endpoints.
- Do not expose internal database structures unnecessarily.
- Never trust client-controlled ownership, role, status, price, or user identity.

## Checklist

- [ ] Route
- [ ] Validation
- [ ] Authentication
- [ ] Authorization
- [ ] Controller
- [ ] Service
- [ ] Model/storage
- [ ] Error handling
- [ ] Response contract
- [ ] Security
- [ ] Verification
