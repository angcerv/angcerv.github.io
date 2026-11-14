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

The app uses hash routing, so app detail links work on GitHub Pages without custom rewrite rules. The catalogue source, package lockfile, and published app bundles in `public/` belong in the repository; `node_modules/` and `dist/` are ignored.

## Edit the catalogue

All application content and access links live in `src/catalog.ts`. The catalogue contains Write Studio, What’s Cooking, and DayCraft, using their existing names, original icons, and documented features. Features, screenshots, version, update date, requirements, and installation instructions are optional and only rendered when supplied.

Add another record to create another card and detail page automatically. The `slug` defines a shareable URL such as `https://your-domain/#/apps/write-studio`. Hash routing supports direct links on static hosts without server rewrite rules. Keep slugs stable after sharing; IDs and slugs must be unique.

## Content sources

- **Write Studio:** `../dev_write/README.md` and the Tauri app configuration. Its original logo was copied from `src-tauri/icons/icon.png`. The catalogue lists macOS and Windows. The Windows x64 installer is built by GitHub Actions from the source snapshot and attached to the public catalogue repository’s `write-studio-windows` release. iPad is omitted from the catalogue because no distributable iPad or web version is available.
- **What’s Cooking:** `../dev_recipes/README.md`, Capacitor configuration, and web manifest. Its original logo was copied from `public/icons/app-192.png`. The project documents the native iPhone app and an installable web version, also accessible from iPad.
- **DayCraft:** `../dev_productivity/README.md` and Capacitor configuration. Its original logo was copied from `public/brand/apple-touch-icon.png`. The project folder is `dev_productivity`, rather than `dev_proactivity`. The catalogue lists the iPhone app.

The copied logos are in `src/assets/apps/` and are bundled locally. The sibling projects are not modified or required to build this website. No new images were generated. Recopy the assets if the original branding changes.

## Distribution

Write Studio offers its existing macOS Apple Silicon development installer, version 0.1.0, from `public/downloads/`. Its catalogue status is Beta; installation and runtime behavior have not been verified for this publication. The macOS installer was rebuilt on 2026-11-14 from a snapshot of the current sibling source in `.build/write-studio-refresh/`; the upstream version is still 0.1.0. The download URL includes the build date to refresh cached copies. All existing Node tests and the emitted-bundle check passed without launching the UI. Write Studio also offers its existing Windows x64 installer through the public `write-studio-windows` GitHub release, built on 2026-11-14 (approximately 221 MB). Its SHA-256 is `6d85dd9e9fe8b72ae6e359c13f057e0968eb47c48043af9a858a0e7a18928ba2`, as reported by GitHub for the uploaded asset. No iPad access option is displayed for Write Studio. What’s Cooking links to its existing installable web app for iPhone, iPad, and browsers. It is publicly hosted at `https://angcerv.github.io/whats-cooking/` without ChatGPT authentication. Its mobile access cards explain Safari’s Add to Home Screen flow. Browser data is local and does not sync automatically with native apps or other devices. DayCraft remains unavailable.

Access options are typed by distribution method:

```ts
{ platform: 'desktop', kind: 'download', url: 'https://your-real-host/installer' }
{ platform: 'web', kind: 'web', url: 'https://your-real-app' }
{ platform: 'iphone', kind: 'app-store', url: 'https://apps.apple.com/your-real-listing' }
{ platform: 'ipad', kind: 'testflight', url: 'https://testflight.apple.com/join/your-real-code' }
{ platform: 'iphone', kind: 'unavailable' }
```

These URLs illustrate the schema; do not copy them as real destinations. Only explicit HTTP(S) URLs become actionable links. Static installers can live in `public/downloads/` and are copied into `dist/` by Vite. Use GitHub Releases for larger installers when release hosting is configured. No arbitrary IPA installation is offered. Confirm the actual desktop OS before replacing `desktop` with `macos`, `windows`, or `linux` in the platforms and access records. Download buttons use that platform name automatically. Access labels are centralized in `src/main.tsx`.

App icons support `{ kind: 'image', src: importedIcon }` for existing local assets and `{ kind: 'symbol', name: 'panels' }` for a Lucide placeholder (`panels`, `layers`, or `orbit`). Both use the shared `AppIcon` component. Original logos retain their colors. Add actual screenshots through `screenshots: [{ src, alt }]`; do not add fabricated product captures. Shared UI styles and design tokens are in `src/styles.css`.

Example labels and their notice are hidden unless a record has `example: true`. Before sharing, supply the actual distribution destinations and relevant installation requirements. Release metadata and screenshots remain omitted until there are confirmed details and real assets to publish.

Fonts are loaded from Google Fonts with local sans-serif fallbacks. The catalogue remains usable if that request is unavailable. Public hosting is public even when its URL is not widely shared.

## Windows installer builds

`python3 scripts/package-write-studio.py ../dev_write` snapshots an explicit allowlist of build inputs into `ci/write-studio-source.tar.gz`, with a SHA-256 manifest. Generated builds, repair backups, IDE settings, and writing projects are excluded. The sibling project is read only. Refresh this snapshot to build a newer app version.

The **Build Write Studio for Windows** workflow runs on snapshot changes or manually. It runs the existing Node and Rust checks without launching the UI, builds the Windows x64 NSIS installer, checks the emitted bundle, and uploads an artifact plus the `write-studio-windows` prerelease asset. The installer is unsigned and has no manual Windows installation verification. The source snapshot was refreshed from `../dev_write` on 2026-11-14, including the upstream correction to the previously failing scene-geography assertion. [Run 43585119680](https://github.com/angcerv/angcerv.github.io/actions/runs/43585119680) passed the Node tests, native Rust tests, Windows x64 build, and emitted-bundle check, then published the installer. The catalogue links to that successful automated build. Windows installation and runtime behavior have not been manually verified.

## What’s Cooking PWA on GitHub Pages

The published bundle was refreshed from local source on 2026-11-14; all 85 non-UI tests passed, including the subpath isolation check.

Run `python3 scripts/build-whats-cooking.py ../dev_recipes` to refresh the published app from local source. The script copies build inputs into an ignored staging directory, adapts the manifest, icons, service-worker registration, and installation text for `/whats-cooking/`, runs the existing non-UI tests plus a subpath isolation check, builds the app, and copies only compiled assets to `public/whats-cooking/`. The sibling project is not modified. Node/npm dependencies must be installable. Commit the script and compiled bundle; the normal catalogue build includes them automatically. No separate app repository is needed for this workflow.

The previous Sites publication remains available for backup export. Changing origin does not transfer browser data: export a full JSON backup there, open the new GitHub Pages app, add it to the Home Screen, then import the backup inside that installed app. Check the imported records before removing the old app. Each visitor uses their own local browser data; publication contains no recipes or personal backups.
