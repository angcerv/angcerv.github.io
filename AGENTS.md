# Project conventions

- Use React and TypeScript. Catalogue records live in `src/catalog.ts`; pages are data driven.
- Keep all UI, code, comments, and documentation in English.
- Reuse `AppIcon`, `Platforms`, `Card`, and `AccessOption` in `src/main.tsx`.
- App detail headers use `.detail-header` for one row containing the accessible icon-only `.back-link`, shared `AppIcon`, and title/status group; allow text to wrap on narrow screens.
- App icons use the typed `image` or `symbol` variant in `src/catalog.ts`. Import original logos from `src/assets/apps`; render them through the shared `AppIcon` image variant without recoloring them.
- Shared colors, radius, and motion tokens live in `src/styles.css` under `:root`. Preserve the dark background and teal brand color `#29676D`.
- Use the installed `lucide-react` icon library. Decorative icons use `aria-hidden`; icon-only controls need accessible names.
- Use `.text-link`, `.button`, `.back-link`, `.status`, and `.example-label` for equivalent controls. Unavailable access is a noninteractive `.unavailable` element.
- Retain visible keyboard focus, reduced-motion support, and responsive layouts.
- Responsive sizing uses `--layout-max`, `--page-gutter`, and `--text-*` tokens in `src/styles.css`; keep fluid desktop sizing, readable text widths, and the shared grid's three/two/one-column breakpoints.
- Do not invent app capabilities, operating systems, distribution links, or product assets.
- Do not generate images or launch applications/browsers for testing without explicit permission.
- Run `npm run typecheck` and `npm run build` for implementation verification.
- Published PWA bundles live in `public/<app>/`; scope each app's manifest and service worker to its own folder. Refresh What’s Cooking with `python3 scripts/build-whats-cooking.py ../dev_recipes`, not by editing compiled assets.
