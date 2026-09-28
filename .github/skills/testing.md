# Backend Testing Skill

When tests exist, preserve and extend the existing testing conventions.

For each feature consider:

## Unit cases

- valid input;
- invalid input;
- missing required fields;
- authorization failure;
- missing resource;
- duplicate resource;
- domain rule failure.

## API cases

- 2xx success;
- 400 validation;
- 401 authentication;
- 403 authorization;
- 404 missing resource;
- 409 conflict;
- 500 unexpected failure.

## Security cases

- invalid token;
- expired token;
- another user's resource;
- role escalation;
- manipulated ownership;
- malformed IDs;
- unexpected query operators;
- invalid file upload.

Never claim tests passed unless they were actually executed.
