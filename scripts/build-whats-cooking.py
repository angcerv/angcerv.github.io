"""Build the sibling app for GitHub Pages without modifying its source."""
import json
from pathlib import Path
import shutil
import subprocess
import sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve()
stage = root / ".build/whats-cooking-github"
stage.mkdir(parents=True, exist_ok=True)
for name in ["src", "public", "scripts", "tests"]:
    target = stage / name
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source / name, target, ignore=shutil.ignore_patterns(".DS_Store"))
for name in ["package.json", "package-lock.json", "index.html", "tsconfig.json", "tsconfig.app.json", "tsconfig.node.json", "vite.config.ts"]:
    shutil.copy2(source / name, stage / name)
native = stage / "ios/App/App"
native.mkdir(parents=True, exist_ok=True)
shutil.copy2(source / "ios/App/App/SceneDelegate.swift", native)

def replace(path, before, after):
    file = stage / path
    text = file.read_text()
    if before not in text:
        raise RuntimeError(f"Source changed; review migration for {path}")
    file.write_text(text.replace(before, after))

replace("index.html", 'href="/', 'href="%BASE_URL%')
replace("src/webApp.ts", "register('/sw.js', { scope: '/',", "register(import.meta.env.BASE_URL + 'sw.js', { scope: import.meta.env.BASE_URL,")
replace("src/WebAppSettings.tsx", "Install on your iPhone", "Install on your iPhone or iPad")
replace("src/i18n.tsx", '"Install on your iPhone": "Instalar en tu iPhone"', '"Install on your iPhone or iPad": "Instalar en tu iPhone o iPad"')
manifest_path = stage / "public/manifest.webmanifest"
manifest = json.loads(manifest_path.read_text())
for key in ["id", "start_url", "scope"]:
    manifest[key] = "./"
for icon in manifest["icons"]:
    icon["src"] = icon["src"].lstrip("/")
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")

# Run the existing manifest assertions against relative paths, plus a real
# service-worker fixture mounted below the catalogue's root.
replace("tests/pwa.test.mjs", "assert.equal(manifest.start_url, '/')", "assert.equal(manifest.start_url, './'); assert.equal(manifest.scope, './'); assert.equal(manifest.id, './')")
replace("tests/pwa.test.mjs", "'../public' + icon.src", "'../public/' + icon.src")
replace("tests/pwa.test.mjs", "function fixture() {", "function fixture(scope = 'https://recipes.example/') {")
replace("tests/pwa.test.mjs", "  const scope = 'https://recipes.example/'\n", "")
with (stage / "tests/pwa.test.mjs").open("a") as file:
    file.write('''
test('subpath PWA caches its own shell and lazy screens without intercepting the catalogue', async () => {
  const app = fixture('https://recipes.example/whats-cooking/')
  await app.lifecycle('install')
  assert.ok(app.requested.every(request => request.url.startsWith('https://recipes.example/whats-cooking/')))
  app.setNetwork(async () => { throw Error('offline') })
  assert.equal(await (await app.fetch('/whats-cooking/', 'navigate')).text(), 'asset')
  assert.equal(await (await app.fetch('/whats-cooking/assets/planner.js')).text(), 'asset')
  assert.equal(app.fetch('/', 'navigate'), undefined)
  assert.equal(app.fetch('/assets/catalogue.js'), undefined)
  assert.equal(app.fetch('/daycraft/', 'navigate'), undefined)
})
''')
for command in [["npm", "ci"], ["npm", "test"], ["npm", "run", "build", "--", "--base", "/whats-cooking/"]]:
    subprocess.run(command, cwd=stage, check=True)

output = stage / "dist"
html = (output / "index.html").read_text()
assert '/whats-cooking/manifest.webmanifest' in html
assert '/whats-cooking/icons/apple-touch-icon.png' in html
worker = (output / "sw.js").read_text()
assert all(path.name in worker for path in (output / "assets").glob("*.js"))
destination = root / "public/whats-cooking"
if destination.exists():
    shutil.rmtree(destination)
shutil.copytree(output, destination)
print(f"Verified PWA copied to {destination}")
