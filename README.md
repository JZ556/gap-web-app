# Greyhound Rescue & Adoption Portal

A Next.js application for connecting retired racing greyhounds with suitable foster and adoptive homes.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS v4
- React Hook Form, Zod, and `@hookform/resolvers`
- Planned server-side REST API and PostgreSQL integration

## Local setup

1. Install Node.js 20.9 or later.
2. Install dependencies with `npm ci`.
3. Copy `.env.example` to `.env.local` and replace the local placeholder values.
4. Start the development server with `npm run dev`.
5. Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run these before every commit:

```bash
npm run lint
npm run build
```

## Project conventions

- Keep routes in `app/` and prefer Server Components by default.
- Put reusable primitives in `components/ui/`, feature-specific UI in `components/features/`, and shared server/client helpers in `lib/`.
- Use Zod schemas as the source of truth for request validation and derive form types from them.
- Use the shared Tailwind colour tokens from `app/globals.css`; do not introduce one-off brand colours.
- Do not commit `.env.local`, database credentials, or other secrets.
- Keep each commit focused on one complete, reviewable change.

## Design foundation

The application uses Open Sans with a light, institutional visual system. Its primary colour is deep navy (`#00334c`), cyan is used for interactive emphasis, and green is reserved for success and availability states. The global tokens in `app/globals.css` are the shared source of truth for future public and admin screens.
//san man here

