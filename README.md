# Greyhound Adoption Portal

A full-stack adoption portal for connecting applicants with retired greyhounds. Applicants manage their applications in a self-service dashboard, while staff review submissions, inspect greyhound records, and manage matches from a separate admin workspace.

## Features

- Email/password registration, login, logout, and password reset with Firebase Authentication
- Applicant dashboard with application count, submission form, status list, and detail pages
- Staff dashboard with application and greyhound metrics, pending and matched application views, and greyhound inventory
- Transactional matching and unmatching that keep application and greyhound statuses in sync
- Protected API routes with Firebase ID token verification and role-based access checks
- Match notification emails rendered with React Email and sent through Resend

## Tech Stack

- Next.js App Router, React, TypeScript, and Tailwind CSS v4
- Firebase Authentication (client SDK and Admin SDK)
- Neon PostgreSQL with Prisma ORM and migrations
- Zod for request validation
- Resend and React Email for match notifications
- Jest for application validation tests

## Local Setup

Install Node.js 20.9 or later, then copy `.env.example` to `.env.local` and fill in the values for your Neon, Firebase, and Resend projects. Never commit `.env.local` or service-account credentials.

```bash
npm ci
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a new database, run `npx prisma migrate deploy` before starting the app to apply the committed migrations.

The runtime uses the pooled `DATABASE_URL`. Prisma migrations use the direct `DIRECT_DATABASE_URL`. The `NEXT_PUBLIC_FIREBASE_*` variables are browser-visible Firebase configuration; `FIREBASE_PRIVATE_KEY`, `RESEND_API_KEY`, and database URLs must remain server-side. See `.env.example` for the complete variable list and formatting notes.

Staff accounts are not created by public registration. Create the staff user in Firebase Authentication and give the matching Neon `profiles` row the `ADMIN` role. New public registrations receive the `USER` role.

## Quality Checks

```bash
npm run lint
npm test
npm run build
```

The Jest suite covers application input validation. Match, email, and unmatch should also be checked end to end with test accounts.

## Deployment Notes

Set the variables from `.env.example` in the hosting platform rather than uploading `.env.local`. For a Vercel build, use `npx prisma generate && npm run build` so the ignored generated client exists. Apply database migrations separately using the direct connection; do not run migrations on every build. Add the deployed domain to Firebase Authentication's authorized domains.

## Project Note

This is not an official Greyhound Racing NSW service. The landing-page greyhound profiles are sample content; application and staff dashboard data come from the database. Match emails currently go to the configured `DEMO_NOTIFICATION_EMAIL`, not directly to the applicant.

