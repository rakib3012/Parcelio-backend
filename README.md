# Parcelio Backend AI Agent Pack

This folder contains production-oriented AI instructions for the Parcelio backend.

## Install

Copy these files into the root of your backend:

```text
parcelio-backend/
├── .github/
│   ├── agents/
│   │   ├── parcelio-backend-architect.agent.md
│   │   └── parcelio-backend-engineer.agent.md
│   ├── skills/
│   │   ├── api-design.md
│   │   ├── security.md
│   │   ├── mongodb.md
│   │   └── testing.md
│   └── copilot-instructions.md
```

## Recommended use

### Architecture / major feature

Use:

```text
Parcelio Backend Architect
```

Best for:

- architecture decisions;
- authentication;
- RBAC;
- parcel lifecycle;
- database design;
- API design;
- security reviews;
- realtime architecture;
- major refactors.

### Normal implementation

Use:

```text
Parcelio Backend Engineer
```

Best for:

- controllers;
- services;
- routes;
- validation;
- models;
- middleware;
- endpoint implementation;
- bug fixes;
- tests.

## Important

These instructions intentionally do not invent the exact Parcelio business domain.

The agent should inspect the repository before creating fields, routes, roles, status values, or workflows.

That prevents the AI from generating plausible-looking but incorrect backend behavior.
