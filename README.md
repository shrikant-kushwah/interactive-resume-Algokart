# Interactive Resume

An interactive, filterable resume built with React, Vite, React Router, and Tailwind CSS. Includes a simple client‑side login and a protected resume route.

## Setup & Run

Prerequisites:
- Node.js 18+ (LTS recommended)
- npm (bundled with Node)

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Project entry points:
- `src/main.jsx` mounts the app and sets up `BrowserRouter`.
- `src/App.jsx` defines routes and session handling.
- `src/components/Resume.jsx` renders the resume UI.
- `src/components/Login.jsx` provides the simple login.

Data:
- The resume reads from `src/constants/resume.json` (adjust the content/paths as needed).

## Hardcoded Credentials

The app uses a simple in‑memory credential check in `src/components/Login.jsx`:
- Email: `shrikant20052001@gmail.com`
- Password: `Shri123`

Notes:
- These are hardcoded for demo purposes only.
- There is no hashing, rate limiting, or backend verification.
- Session is stored in `localStorage` under the key `interactive_resume_session`.

To change credentials, update the `VALID` object in `src/components/Login.jsx`.

## Tech Stack & Key Decisions

- React 19 + React DOM
  - Functional components and hooks for state and effects.
- React Router 7
  - Routing and client‑side protection via a `ProtectedRoute` wrapper.
- Vite 7
  - Fast dev server and build tooling.
- Tailwind CSS 4
  - Utility‑first styling for responsive UI and print styles.
- ESLint 9
  - Linting for code quality and consistency.

Decisions:
- Client‑only app: no backend or API. All data is local JSON, and “auth” is purely client‑side.
- Session persistence via `localStorage` for simplicity.
- Print support: “Download PDF” triggers the browser print dialog with tailored print styles.

## Protected Routes and Authentication

Authentication flow (client‑side only):
- `src/components/Login.jsx` validates form inputs and compares against the hardcoded `VALID` credentials.
- On success, `App` stores a minimal session object in `localStorage` under `interactive_resume_session`.
- `App.jsx` redirects based on session state:
  - If a session exists, navigate to `/resume`.
  - If no session, navigate to `/login`.

Protected route:
- `ProtectedRoute` in `src/App.jsx` wraps the `/resume` route. If `session` is falsy, it redirects to `/login`.
- The resume page (`/resume`) receives the `user` prop and an `onLogout` handler. Logout clears session and returns to `/login`.

Important caveats:
- This protection is purely client‑side; it does not prevent a determined user from manipulating `localStorage` to bypass the gate.
- There is no server session, CSRF protection, or token validation.

## Known Trade‑offs and “If I had more time”

- Security:
  - Hardcoded credentials; no password hashing or secure storage.
  - Client‑side only auth is bypassable and stores session in `localStorage` (susceptible to XSS if any unsafe HTML is introduced).
  - No server‑side validation, no rate limiting, no lockouts, and no audit logging.
- Data:
  - Resume content is static JSON. There’s no CMS or API for updates.
- UX/Accessibility:
  - Login is basic; could add a11y enhancements, validations per field, and better error semantics.
  - Could add saved filters, deep links with query params for search/skills, and keyboard navigation improvements.
- Testing/Quality:
  - No unit/integration/e2e tests yet (e.g., Vitest, React Testing Library, Playwright).
  - No CI workflow for lint, build, and preview deploys.
- Architecture:
  - No state management beyond local state; could introduce a small store for session and filters.
  - No environment configuration (`.env`) for runtime configuration or credentials (intentionally avoided here).

Potential improvements:
- Replace hardcoded login with a proper backend (email/password against a user store) or passwordless link flow.
- Use JWT or session cookies, server‑side protected routes, and refresh token rotation.
- Migrate session from `localStorage` to HTTP‑only cookies to reduce XSS impact.
- Add tests, CI, and automated deployments (e.g., GitHub Actions + Vercel/Netlify).
- Add CSR/SSR/SSG as needed; consider Next.js for SSR and routing if SEO is a priority.
- Add print‑to‑PDF via a node service or client library for consistent output.

## Scripts (from package.json)

- `npm run dev`: Start Vite dev server.
- `npm run build`: Build production assets.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint.


