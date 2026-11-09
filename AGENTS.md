<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Global Project Rules & Frontend Conventions

## Frontend Folder Structure Convention

For all frontend development under `app/` (`C:\Users\Venom Tech\Desktop\venomtech\venom-tech\app`):

### 1. Components
All reusable and page-specific components must follow this structure:
`/app/component/component-main-page-name/component-sub-folder/component`

- **Pattern**: `app/component/<component-main-page-name>/<component-sub-folder>/<component-name>.<ext>`
- **`component-main-page-name`**: The primary page, module, or feature context (e.g., `home`, `dashboard`, `auth`, `profile`).
- **`component-sub-folder`**: The specific sub-domain, section, or category (e.g., `cards`, `forms`, `hero`, `modals`, `tables`, `navigation`).
- **`component`**: The component file itself (e.g., `HeroBanner.tsx`, `LoginForm.tsx`) or component folder with its index/styles.

### 2. Pages / Screens
All pages and screen views must follow this structure:
`/app/screens/screenname(eg: page name)/pagefile`

- **Pattern**: `app/screens/<screenname>/<pagefile>`
- **`screenname`**: The specific screen or page identifier (e.g., `home`, `login`, `settings`, `analytics`).
- **`pagefile`**: The page or screen entry file (e.g., `page.tsx`, `ScreenName.tsx`).

