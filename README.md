# SkillConnect — Local Skills & Services Marketplace

SkillConnect is a neighborhood service marketplace for Kalaburagi, Karnataka. It helps customers discover local service professionals and gives workers a place to create a profile, receive job requests, and build trust through completed bookings and reviews.

> **Repository status:** This repository is a source backup exported from Floot. It contains application pages, endpoint handlers, shared helpers, and styles, but it is **not currently a self-contained project that can be installed and run with npm**. See [Running the project](#running-the-project) before attempting a local setup.

## Features represented in the source

### Customers
- Register and sign in with a customer account.
- Browse workers by skill and neighbourhood.
- Filter and sort worker results, including by availability, rating, price, and experience.
- Request a booking and view booking progress.
- Message the worker associated with a booking.
- Leave a review after a completed booking.
- Submit a complaint about a booking and receive notifications.

### Workers
- Register a worker profile with a skill, neighbourhood, experience, headline, bio, and hourly rate.
- Wait for administrator verification before appearing in worker search.
- View booking requests and manage booking status.
- Message customers and receive booking notifications.

### Administrators
- Review and verify worker profiles.
- Moderate flagged or pending reviews.
- Review and resolve customer complaints.
- Activate or deactivate user accounts.
- View marketplace activity and summary statistics.

## Technology

- **UI:** React 19, TypeScript, React Router
- **Styling:** CSS Modules and shared CSS variables
- **Icons:** Lucide React
- **API handlers:** TypeScript serverless endpoint handlers
- **Database:** PostgreSQL
- **Database access:** Kysely with the postgres.js driver
- **Validation and data transport:** Zod and SuperJSON
- **Authentication:** bcryptjs password hashing and database-backed sessions

## Repository structure

```text
SkillConnect/
├── components/          # Reusable UI components and component examples
├── endpoints/           # API endpoint handlers and request schemas
│   ├── admin/
│   ├── auth/
│   ├── bookings/
│   ├── chat/
│   ├── complaints/
│   ├── reviews/
│   └── worker/
├── helpers/              # Database, authentication, schema and UI helpers
├── pages/                # Home, login, registration, dashboard and admin pages
├── static/
│   └── __dev/            # Floot export/development metadata
├── base.css              # Shared design tokens and theme variables
├── .env.example          # Environment variable template
├── .gitignore
├── EXPORT_NOTES.md       # Scope and limitations of this source backup
└── README.md
```

## Database

The application code expects a PostgreSQL database and reads its connection string from:

```env
FLOOT_DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DATABASE
```

The typed database model is documented in `helpers/schema.tsx`. That file describes the expected tables; it is **not** a database migration or seed script. No database dump, migration set, or production credentials are included in this repository.

## Running the project

### Important: Floot runtime required

The current repository is an export snapshot, not the complete official Floot runtime export. In particular, it does not include a root `package.json`, lockfile, application bootstrap/build configuration, endpoint router, or database migration/seed scripts. The endpoint files export `handle()` functions that are expected to be mounted by the platform runtime.

For that reason, commands such as `npm install` or `npm run dev` are **not available in this repository as it stands**. Adding a guessed package manifest would not make the application runnable and could give a misleading impression that the project is deployment-ready.

To run SkillConnect outside Floot, first obtain the complete official code export and the required database setup from the original Floot project. Then:
1. Install the Node.js version and dependencies specified by that official export.
2. Configure `FLOOT_DATABASE_URL` in a local, untracked `.env` file.
3. Apply the official database migrations and seed data, if supplied.
4. Use the start/build scripts included with the official export.
5. Test customer, worker, and admin flows before deploying.

## Security notes

- Never commit real database URLs, passwords, session secrets, or other credentials.
- Keep local secrets in `.env`; the file is ignored by Git.
- `.env.example` contains placeholders only.
- Review authentication, authorization, and database configuration before any public deployment.

## Current limitations

- This repository alone is not independently runnable or deployable.
- The database schema types are present, but database migrations, seed data, and a database backup are not included.
- The home page includes local sample-worker fallback data for preview purposes; a live database is required for persisted marketplace data.
- The map-style discovery view is a UI preview, not proof of a configured external map service.
- No payment integration is included in the checked-in endpoint set.

## Project information

- **Project:** SkillConnect
- **Category:** Full-stack web application
- **Use case:** Local skill and service discovery
- **Target location:** Kalaburagi, Karnataka, India
- **Source status:** Floot application source backup

---

*Connecting local skills with local opportunities.* 🤝
