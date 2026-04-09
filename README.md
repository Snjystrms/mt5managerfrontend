# MT5 Manager Frontend Test App

Simple Next.js frontend for testing an existing MT5 Manager backend API.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- `fetch`-based API client

## Features

- Dashboard health and manager overview
- Groups and account-products lookup
- Create account form
- Users lookup by group mask or login
- Account detail and open positions
- History lookup with date range
- Balance adjustment testing

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

You can copy from `.env.example`.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the environment variable `NEXT_PUBLIC_API_BASE_URL` in the Vercel project settings.
4. Deploy.

## Notes

- This app intentionally avoids complex authentication so you can focus on backend testing.
- All pages show loading and error states.
- Responses are displayed as readable JSON and simple tables.
- The API base URL is read from `NEXT_PUBLIC_API_BASE_URL`, which keeps configuration simple for local and Vercel environments.