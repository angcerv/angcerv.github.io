# Astronaut Studios

A small, static application catalogue built with React, TypeScript, and Vite. No backend, accounts, analytics, cookies, or generated images.

## Development

```sh
npm install
npm run dev
```

## Verification and production

```sh
npm run typecheck
npm run build
```

The production output is `dist/`. `npm run preview` can serve the production build when explicitly desired.

## GitHub Pages

The target repository is `angcerv/angcerv.github.io`, serving `https://angcerv.github.io/`. For GitHub Free, the repository must be public. In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The workflow in `.github/workflows/deploy-pages.yml` checks and builds the site, then publishes `dist/` on every push to `master`. It can also be started manually from the Actions tab.

The app uses hash routing, so app detail links work on GitHub Pages without custom rewrite rules. Only source files and the package lockfile belong in the repository; `node_modules/` and `dist/` are ignored.

## Edit the catalogue

All application content and access links live in `src/catalog.ts`. The catalogue contains Write Studio, What’s Cooking, and DayCraft, using their existing names, original icons, and documented features. Features, screenshots, version, update date, requirements, and installation instructions are optional and only rendered when supplied.

Add another record to create another card and detail page automatically. The `slug` defines a shareable URL such as `https://your-domain/#/apps/write-studio`. Hash routing supports direct links on static hosts without server rewrite rules. Keep slugs stable after sharing; IDs and slugs must be unique.

## Content sources

- **Write Studio:** `../dev_write/README.md` and the Tauri app configuration. Its original logo was copied from `src-tauri/icons/icon.png`. The catalogue lists macOS and iPad; the README describes Windows validation as pending, so Windows is not advertised here. The iPad build also has platform limitations documented in the source project; the shared feature list does not promise complete platform parity.
- **What’s Cooking:** `../dev_recipes/README.md`, Capacitor configuration, and web manifest. Its original logo was copied from `public/icons/app-192.png`. The project documents iPhone and installable web versions.
- **DayCraft:** `../dev_productivity/README.md` and Capacitor configuration. Its original logo was copied from `public/brand/apple-touch-icon.png`. The project folder is `dev_productivity`, rather than `dev_proactivity`. The catalogue lists the iPhone app.

The copied logos are in `src/assets/apps/` and are bundled locally. The sibling projects are not modified or required to build this website. No new images were generated. Recopy the assets if the original branding changes.

## Distribution

No confirmed public download, App Store, TestFlight, or web access URLs were found in the reviewed documentation. All access options therefore remain noninteractive with a “Coming soon” state. This describes catalogue access, rather than claiming that local development builds are releases. Add the real URLs and update each app’s status when its distribution is ready.

Access options are typed by distribution method:

```ts
{ platform: 'desktop', kind: 'download', url: 'https://your-real-host/installer' }
{ platform: 'web', kind: 'web', url: 'https://your-real-app' }
{ platform: 'iphone', kind: 'app-store', url: 'https://apps.apple.com/your-real-listing' }
{ platform: 'ipad', kind: 'testflight', url: 'https://testflight.apple.com/join/your-real-code' }
{ platform: 'iphone', kind: 'unavailable' }
```

These URLs illustrate the schema; do not copy them as real destinations. Only explicit HTTP(S) URLs become actionable links. Keep installers on your external hosting, outside this repository. No arbitrary IPA installation is offered. Confirm the actual desktop OS before replacing `desktop` with `macos`, `windows`, or `linux` in the platforms and access records. Download buttons use that platform name automatically. Access labels are centralized in `src/main.tsx`.

App icons support `{ kind: 'image', src: importedIcon }` for existing local assets and `{ kind: 'symbol', name: 'panels' }` for a Lucide placeholder (`panels`, `layers`, or `orbit`). Both use the shared `AppIcon` component. Original logos retain their colors. Add actual screenshots through `screenshots: [{ src, alt }]`; do not add fabricated product captures. Shared UI styles and design tokens are in `src/styles.css`.

Example labels and their notice are hidden unless a record has `example: true`. Before sharing, supply the actual distribution destinations and relevant installation requirements. Release metadata and screenshots remain omitted until there are confirmed details and real assets to publish.

Fonts are loaded from Google Fonts with local sans-serif fallbacks. The catalogue remains usable if that request is unavailable. Public hosting is public even when its URL is not widely shared.
