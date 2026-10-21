# SkillConnect — source snapshot

This repository contains the source files currently readable from the SkillConnect project in Floot.

SkillConnect is a local skills and job marketplace concept for Kalaburagi, Karnataka. The app source includes React/TypeScript pages, CSS Modules, UI components, typed API endpoints, Kysely database schema helpers, and authentication/booking/review/chat/admin logic.

## Important: source snapshot, not Floot's official runnable export

This archive was assembled from the project files accessible to the Floot connector. It is **not** the official Floot code ZIP. Floot's browser export adds runtime/server scaffolding and environment templates that are not available through the connector. The current source also relies on Floot's managed PostgreSQL connection and hosting conventions.

Therefore, uploading this archive to GitHub preserves the source, but does not by itself guarantee that the application can be launched outside Floot unchanged. To self-host it, you will need to add/replace the runtime server scaffolding, configure your own PostgreSQL database, restore/create the database schema and seed data, configure environment variables, and migrate any platform-specific behavior. Do not publish secrets or real user data.

## Project structure

- `pages/` — homepage, login, registration, worker detail pages and styles
- `components/` — shared UI components and styles
- `endpoints/` — backend API endpoint handlers and request/response schemas
- `helpers/` — database schema, authentication, UI state, hooks and utilities
- `base.css` — global design tokens and base styles
- `static/__dev/` — project design notes, dependency metadata and development configuration

## Stack in this source snapshot

- React + TypeScript
- CSS Modules
- Kysely + PostgreSQL
- bcryptjs, jose, superjson, zod
- Floot-managed hosting/runtime conventions

## Demo credentials

The original project brief mentions demo accounts. Treat any demo credentials as development-only and change them before any public deployment. Never reuse real passwords.

## Suggested next steps

1. Commit this source snapshot to your own GitHub repository.
2. Keep the original Floot preview as the reference for visual comparisons.
3. Before self-hosting, migrate the database and hosting dependencies and run type checks/tests.
4. Review authentication, authorization, and demo seed data before making a public deployment.

Generated from the current Floot project files; no official server bundle or database dump is included.
