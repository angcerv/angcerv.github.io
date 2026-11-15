"""Build DayCraft for its own GitHub Pages scope without editing the sibling."""
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('prepare_mobile', ROOT / 'scripts/prepare-mobile.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
stage = module.prepare(Path(sys.argv[1]).resolve(), 'daycraft-web')
for document in (stage / 'public').rglob('*.md'):
    document.unlink()
(stage / 'scripts').mkdir(exist_ok=True)
shutil.copy2(ROOT / 'scripts/daycraft-pwa-plugin.mjs', stage / 'scripts/pwa-plugin.mjs')
shutil.copy2(ROOT / 'scripts/daycraft-service-worker.js', stage / 'scripts/service-worker.js')
shutil.copy2(ROOT / 'scripts/daycraft-pwa.test.mjs', stage / 'tests/publication-pwa.test.mjs')
manifest = {'id': './', 'name': 'DayCraft', 'short_name': 'DayCraft', 'start_url': './', 'scope': './', 'display': 'standalone', 'background_color': '#6264a7', 'theme_color': '#6264a7', 'icons': [{'src': f'brand/app-{size}.png', 'sizes': f'{size}x{size}', 'type': 'image/png', 'purpose': 'any'} for size in [192, 512]]}
for size in [192, 512]:
    subprocess.run(['sips', '--resampleHeightWidth', str(size), str(size), str(stage / 'public/brand/daycraft-logo.png'), '--out', str(stage / f'public/brand/app-{size}.png')], check=True, stdout=subprocess.DEVNULL)
(stage / 'public/manifest.webmanifest').write_text(json.dumps(manifest, indent=2) + '\n')
p = stage / 'index.html'
p.write_text(p.read_text().replace('href="/', 'href="%BASE_URL%').replace('</head>', '<link rel="manifest" href="%BASE_URL%manifest.webmanifest"/></head>'))
p = stage / 'src/App.tsx'
p.write_text(p.read_text().replace('src="/brand/daycraft-logo.png"', 'src={import.meta.env.BASE_URL + "brand/daycraft-logo.png"}'))
p = stage / 'vite.config.ts'
p.write_text(p.read_text().replace("import react", "import { pwaPlugin } from './scripts/pwa-plugin.mjs'\nimport react").replace('plugins: [react()]', 'plugins: [react(), pwaPlugin()]'))
(stage / 'src/pwa-plugin.d.ts').write_text('declare module "*.mjs" { export function pwaPlugin(): import("vite").Plugin }\n')
with (stage / 'src/main.tsx').open('a') as f:
    f.write('''\nif (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js', {scope: import.meta.env.BASE_URL, updateViaCache: 'none'}).catch(() => undefined)
  })
}
''')
for cmd in [['npm', 'ci'], ['npm', 'test'], ['node', '--test', 'tests/publication-pwa.test.mjs'], ['npm', 'run', 'build', '--', '--base', '/daycraft/']]:
    subprocess.run(cmd, cwd=stage, check=True)
output = stage / 'dist'
assert '/daycraft/manifest.webmanifest' in (output / 'index.html').read_text()
assert '/daycraft/brand/' in (output / 'index.html').read_text()
assert 'daycraft-shell-' in (output / 'sw.js').read_text()
assert 'whats-cooking-shell-' not in (output / 'sw.js').read_text()
target = ROOT / 'public/daycraft'
if target.exists():
    shutil.rmtree(target)
shutil.copytree(output, target)
print(f'Verified DayCraft web bundle copied to {target}')
