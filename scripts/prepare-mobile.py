"""Copy explicit app build inputs into an isolated publication workspace."""
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]

def prepare(source, name):
    stage = ROOT / '.build' / name
    stage.mkdir(parents=True, exist_ok=True)
    for name in ['src', 'public', 'scripts', 'tests', 'ios/App/App']:
        origin = source / name
        target = stage / name
        if target.exists():
            shutil.rmtree(target)
        if origin.exists():
            shutil.copytree(origin, target, ignore=shutil.ignore_patterns('.DS_Store', 'build', 'Pods'))
    for name in ['package.json', 'package-lock.json', 'index.html', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'vite.config.ts', 'capacitor.config.ts']:
        if (source / name).exists():
            shutil.copy2(source / name, stage / name)
    return stage

if __name__ == '__main__':
    print(prepare(Path(sys.argv[1]).resolve(), sys.argv[2]))
