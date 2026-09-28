# Backend Security Skill

Apply this skill to every Parcelio backend feature.

## Authentication

- Verify JWT server-side.
- Never trust a decoded token without signature verification.
- Reject expired/invalid tokens.
- Keep secrets in environment variables.

## Authorization

Authentication answers "who are you?"

Authorization answers "are you allowed to do this?"

Always enforce authorization on the backend.

## Input

Treat all client input as untrusted.

Validate:

- body
- params
- query
- file metadata

Use Zod.

## Passwords

- bcryptjs hashing;
- never plaintext;
- never return password hashes;
- avoid account-enumeration leaks where relevant.

## Database

- avoid dynamic unvalidated MongoDB operators;
- validate IDs;
- use controlled query objects;
- prevent unauthorized document access.

## Files

- validate size;
- validate MIME/type;
- generate safe names;
- prevent path traversal;
- do not execute uploaded content.

## Logs

Never log:

- passwords;
- JWTs;
- refresh tokens;
- authorization headers;
- SMTP credentials;
- sensitive personal information without a clear operational reason.

## Security review

For every new endpoint ask:

1. Can an unauthenticated user call it?
2. Can another user access someone else's resource?
3. Can a user change a protected field?
4. Can a user bypass a role check?
5. Can input alter a database query?
6. Can an uploaded file cause harm?
7. Does the endpoint leak sensitive information?
